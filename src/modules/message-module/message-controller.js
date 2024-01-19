import messageModel from "../../../Database/models/message-model.js";
import  QRCode  from "qrcode";
const getAllmessages=async(req,res)=>{
  try{
    const messages= await messageModel.find({receivedId:req.user.userId});
    res.json({message:"success",messages});
  }
  catch(err){res.json({message:"Error",err})}
}
const addMessage=async(req,res)=>{
    await messageModel.insertMany(req.body);
    res.json({message:"Success"});
}
const shareProfile=async(req,res)=>{
  QRCode.toDataURL("http://localhost:3200/messages/profile",(err,qr)=>{
   return res.send(`<img src="${qr}">`);
  })
 
}

export{getAllmessages,addMessage,shareProfile}