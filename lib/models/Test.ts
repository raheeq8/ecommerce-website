import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    name: String
})

const Test = mongoose.models.Test || mongoose.model("Test", testSchema)

export default Test