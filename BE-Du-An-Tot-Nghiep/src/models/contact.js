
import mongoose from "mongoose";
import { Schema } from "mongoose";
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
     phoneNumber: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);
export default mongoose.model("Contact", contactSchema);
