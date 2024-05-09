import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    // const { userId } = auth();
    // if (!userId) {
    //   return new NextResponse("Not authorized", { status: 400 });
    // }
    await connectToDB();

    // cartItems,
    // customer,
    const {
      country,
      fName,
      lName,
      company,
      address,
      city,
      province,
      postal,
      phone,
    } = await req.json();
    // !cartItems ||
    // !customer ||

    if (
      !country ||
      !fName ||
      !lName ||
      !address ||
      !city ||
      !province ||
      !postal ||
      !phone
    ) {
      return new NextResponse("Not enough data to checkout", { status: 400 });
    }
    const newOrder = new Order({
      country,
      fName,
      lName,
      company,
      address,
      city,
      province,
      postal,
      phone,
    });
    await newOrder.save();
    return NextResponse.json(newOrder, { headers: corsHeaders });
  } catch (error) {
    console.log("[placeorder_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
