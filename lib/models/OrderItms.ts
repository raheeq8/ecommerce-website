import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const OrderItems = mongoose.models.OrderItems || mongoose.model("OrderItems", orderItemsSchema);

export default OrderItems;
