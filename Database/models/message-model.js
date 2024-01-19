import mongoose from "mongoose";
const messageSchema=mongoose.Schema({
    message:{type:String},
    receivedId:{type:mongoose.Types.ObjectId,ref:"user"}
})
const messageModel=mongoose.model("message",messageSchema);
export default messageModel;