import messageModel from "../../../Database/models/message-model.js";
import  QRCode  from "qrcode";
import { catchError } from "../middleware/catchError.js";
const getAllmessages=catchError(async(req,res,next)=>{
    const messages= await messageModel.find({receivedId:req.user.userId});
    res.json({message:"success",messages});
})
const addMessage=catchError(async(req,res,next)=>{
    await messageModel.insertMany(req.body);
    res.json({message:"Success"});
})
const shareProfile=catchError(async(req,res,next)=>{
  QRCode.toDataURL("http://localhost:3200/messages/profile",(err,qr)=>{
   return res.send(`<img src="${qr}">`);
  })
})

export{getAllmessages,addMessage,shareProfile}