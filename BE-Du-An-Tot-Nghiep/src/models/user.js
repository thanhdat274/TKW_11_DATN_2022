import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
const {ObjectId} = mongoose.Types;
const userSchema = new Schema({
name : {
    type : String,
    required : true,
    trim : true,
},
phoneNumber:{
    type : String,
    unique : true,
},
avatar : {
    type : String,
},
address : {
    type :String
},
age : {
    type : Number
},
gender : {
    type : Number
},
password: {
    type: String,
    required: true,
    minLength: 8,
    validate : (value) => {
        return validator.isAlphanumeric(value)
    }
},
role : {
    type : Number,
    default : 0,
},
permission :  {
    type : Array,
},
employeeId : {
    type : ObjectId,
    ref : "Employee"
    //Nếu là tk nhân viên,
},
status : {
    type : Number,
    default : 0    
},
serviceUsed : [
    {
      type : ObjectId,
      ref : 'Service'
    }
  ],
  usedQuantity:{
    type : Number,
    default: 0
  }
},{timestamps:true})

userSchema.pre('save',async function(next){
    const user = this
    const saltRounds = 10;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,saltRounds);
    }
    next()
})
export default mongoose.model('Users',userSchema)