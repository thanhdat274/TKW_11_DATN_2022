import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;

const commentSchema = new Schema({
    userId : {
        type : ObjectId,
        ref : 'User'
    },
    postId : {
        type : ObjectId,
        ref : 'Blog'
    },
    commentContent : {
        type : String,
        required : true,
        trim : true,
    }
},{timestamps:true})

export default mongoose.model('Comment',commentSchema)