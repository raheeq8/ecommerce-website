import Order from "@/lib/models/Order";
import OrderItems from "@/lib/models/OrderItms";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const orderList = await Order.find()
      .populate("user", "fullName")
      .sort({ dateOrdered: -1 });
    if (!orderList) {
      return new NextResponse("Orderlist not found", { status: 404 });
    }
    return NextResponse.json(orderList, { status: 200 });
  } catch (error) {
    console.log(`[Order_GET]`, error);
    return new NextResponse("Internal server error", { status: 404 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const {
      orderItems,
      fName,
      lName,
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      totalPrice,
      user,
    } = await req.json();
    // const orderItemsIds = await Promise.all(
    //   orderItems.map(async (orderItem: any) => {
    //     let newOrderItem = new OrderItems({
    //       quantity: orderItem.quantity,
    //       product: orderItem.product,
    //     });
    //     newOrderItem = await newOrderItem.save();

    //     return newOrderItem._id;
    //   })
    // );
    // const orderItemsIdsResolved = orderItemsIds;
    let order = new Order({
      orderItems,
      fName,
      lName,
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      totalPrice,
      user,
    });
    order = await order.save();
    if (!order) {
      return new NextResponse("Order cannot be created", { status: 400 });
    }
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log(`[Order_POT]`, error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

// export async function POST(req: any) {
//     try {
//     //   await connectToDB();

//     const { orderItems } = await req.json()
//     const ids = orderItems.map

//     console.log(orderItems);

//       return NextResponse.json(orderItems, { status: 200 });
//     } catch (error) {
//       console.log(`[Order_POT]`, error);
//       return new NextResponse("Orderlist not found", { status: 404 });
//     }
//   };
