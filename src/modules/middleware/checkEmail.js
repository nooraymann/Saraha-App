import userModel from "../../../Database/models/user-model.js";
import { AppError } from "../../utils/AppError.js";


 const checkEmail=async(req,res,next)=>{
    const exist=await userModel.findOne({email:req.body.email});
    if(exist)return next(new AppError("user already exists",409))
    next();
}
export default checkEmail;