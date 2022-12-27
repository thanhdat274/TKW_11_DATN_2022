import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;

const feedbackSchema = new Schema({
    content : {
        type : String,
        required : true,
        minLength : 8,
    },
    user : {
        type : ObjectId,
        ref : 'Users'
    },
    service : {
        type : ObjectId,
        required : true,
    },
    feedbackType : {
        type : String,
        required : true
    },
    stars : {
        type : Number,
        required : true
    },
    reply : {
        type : String
    },
    userReply : {
        type : ObjectId,
        ref : 'Users'
    }
},{timestamps:true})

export default mongoose.model('Feedback',feedbackSchema)