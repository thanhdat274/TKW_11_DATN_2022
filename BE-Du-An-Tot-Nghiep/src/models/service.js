import mongoose from "mongoose";
import { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required : true

    },

    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    serviceType: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    }
  },
  { timestamps: true }
);
export default mongoose.model("Service", serviceSchema);
