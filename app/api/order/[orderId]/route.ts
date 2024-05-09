import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  try {
    await connectToDB();
    const order = await Order.findById(params.orderId).populate({
       path:"orderItems", populate: { path: 'product'}
    });
    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log(`[OrderId_GET]`, error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const dynamic = "force-dynamic"