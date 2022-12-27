import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;

const notificationSchema = new Schema({
bookingId : {
    type : ObjectId,
    ref : 'Booking'
},
notificationType : {
    type : String
},
text : {
    type : String
},
from : {
    type : ObjectId,
    ref: 'Users'
},
userId : {
    type : ObjectId,
    ref : 'Users'
},
employeeId : {
    type : ObjectId,
    ref : 'Employee'
},
readed: {
    type : Boolean,
    default : false
}
},{timestamps: true})

export default mongoose.model('Notification',notificationSchema)