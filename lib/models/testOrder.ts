
// import mongoose from "mongoose";

// /**
//  Order Example: 

//  {
//     "orderItems" : [
//         {
//             "quantity":1,
//             "product":"gdhjy5hd78hdjkshjg8iwlksj"
//         },
//         {
//             "quantity":1,
//             "product":"6yds67twtsggygw98qgds"
//         },
//     ],
//     "shippingAddress1":"Lahore",
//     "shippingAddress2":"street-8",
//     "city":"Lahore",
//     "country":"pakistan",
//     "phone":"134568876",
//     "user":"13wdffsda45fdgfdz68ds876",
//  }
//  */

// const orderSchema = new mongoose.Schema({
//   orderItems: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "OrderItems",
//       required: true,
//     },
//   ],
//   fName: {
//     type: String,
//     required: true
//   },
//   lName: {
//     type: String,
//     required: true
//   },
//   shippingAddress1: {
//     type: String,
//     required: true
//   },
//   shippingAddress2: {
//     type: String
//   },
//   city: {
//     type: String,
//     required: true
//   },
//   zip: {
//     type: String,
//     required: true
//   },
//   country: {
//     type: String,
//     required: true
//   },
//   phone: {
//     type: String,
//     required: true
//   },
//   totalPrice: {
//     type: Number
//   },
//   user: {
//     type: String,
//     required: true
//   },
//   dateOrdered: {
//     type: Date,
//     default: Date.now(),
//   }
// });

// orderSchema.virtual('id').get(function (){
//     return this._id.toHexString();
// })

// orderSchema.set("toJSON",{
//     virtuals: true
// })

// const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

// export default Order;
