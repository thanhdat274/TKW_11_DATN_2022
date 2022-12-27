import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;

const bookingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
    },
    phoneNumber: {
      type: String,
      required : true
    },
    note: {
      type: String,
    },
    status: {
      type: Number,
      default : 0,
    },
    date: {
      type: Date,
      required: true,
    },
    time : {
      type : String,
    },
    userId: {
      type: ObjectId,
      ref: "Users",
      required:false
    },
    employeeId: {
      type: ObjectId,
      ref: "Employee",
    },
    services: [
     {
      serviceId : {
        type : ObjectId,
        ref: "Service"
      },
      price : {
        type : Number
      }
     }
    ],
    gender:{
      type : String,
    },
    bookingPrice : {
      type : Number
    },
    voucher : {
      type : ObjectId,
      ref : 'Voucher'
    }
  },
  { timestamps: true }
);
bookingSchema.index({employeeId : -1})
export default mongoose.model("Booking", bookingSchema);
