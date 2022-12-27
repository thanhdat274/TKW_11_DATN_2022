const { ObjectId } = mongoose.Types;
import mongoose, { Schema } from "mongoose";

const voucherSchema = new Schema(
  {
    name : {
        type :String,
        required:true
    },
    code:{
        type:String,
        required:true,
        minLength:4
    },
    discount:{
        type : Number,
        required:true
    },
    service:{
        type :ObjectId,
        ref: 'Service',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    type : {
      type : String,
    },
    expirationDate:{
        type : Date,
        required :true
    },
    userUsed : {
      type : Array
    },
    description:{
      type : String,
      minLength : 30
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Voucher", voucherSchema);
