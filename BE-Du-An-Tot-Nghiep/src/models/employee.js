import mongoose, {Schema} from "mongoose";
const {ObjectId} = mongoose.Types;
const employeeSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    idCard:{
        type:String,
        unique : true
    },
    email:{
        type:String,
        unique : true
    },
    phoneNumber:{
        type:String,
        validate: (value) => {
            return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value);
        },
    },
    status:{
        type:Number,
        default:1
    },
    avatar:{
        type:String,
    },
    gender:{
        type:Number,
    }

} ,{timestamps: true})

export default mongoose.model("Employee", employeeSchema)