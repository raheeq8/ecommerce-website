"use client";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/imageUpload";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useToast } from "../ui/use-toast";
import Delete from "../custom ui/Delete";
import Loader from "../custom ui/Loader";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "title length should be greater than 2 characters" })
    .max(20, { message: "title length should be less than 20 characters" }),
  description: z
    .string(),
  image: z.string(),
});

interface CollectionFormProps {
  initialData?: CollectionType | null;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const params = useParams()
  console.log(initialData)

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? initialData : {
      title: "",
      description: "",
      image: ""
    } 
  });
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === "Enter"){
      e.preventDefault()
    }
  }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = initialData
        ? `/api/collections/${params.collectionId}`
        : "/api/collections";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setLoading(false);
        toast({
          title: "Success",
          description: `Collection ${
            initialData ? "updated" : "created"
          } successfully`,
        });
        window.location.href = "/collections";
        router.push("/collections");
      }
      setLoading(false)
    } catch (error) {
      console.log(`[collectionform, collection_POST], ${error}`);
      toast({
        title: "Error",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
      setLoading(false)
    }
  };
  return loading ? <Loader/> : (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className=" text-heading2-bold">Edit Collection</p>
          <Delete id={initialData._id} item="collection"/>
        </div>
      ) : (
        <p className=" text-heading2-bold">Create Collection</p>
      )}

      <Separator className="my-4 bg-grey-1 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>title</FormLabel>
                <FormControl>
                  <Input placeholder="title.." {...field} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="description.." {...field} rows={5} onKeyDown={handleKeyPress}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 text-white">
              Submit
            </Button>
            <Button
              type="button"
              className="bg-blue-1 text-white"
              onClick={() => router.push("/collections")}
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
