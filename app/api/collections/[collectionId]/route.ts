import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectToDB();
    const collection = await Collection.findById(params.collectionId).populate({
      path: "products",
      model: Product,
    });
    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }
    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log(`[collectionid_GET1] ${error}`);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    await connectToDB();
    let collection = await Collection.findById(params.collectionId);
    console.log(collection);

    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }

    const { title, image, description } = await req.json();
    if (!title) {
      return new NextResponse("title and image is required", { status: 400 });
    }
    collection = await Collection.findByIdAndUpdate(
      params.collectionId,
      {
        title,
        image,
        description,
      },
      {
        new: true,
      }
    );
    await collection.save();
    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log(`[collectionid_POST] ${error}`);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("IUnauthorized", { status: 400 });
    }
    await connectToDB();
    await Collection.findByIdAndDelete(params.collectionId);

    await Product.updateMany(
      { collections: params.collectionId },
      { $pull: { collections: params.collectionId } }
    );

    return new NextResponse("Collection deleted successfully", { status: 200 });
  } catch (error) {
    console.log(`[collectionid_DELETE] ${error}`);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic"