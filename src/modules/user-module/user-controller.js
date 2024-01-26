import userModel from "../../../Database/models/user-model.js";
import { sendEmail } from "../emails/send-email.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";
import cloudinary from "../../utils/cloudinary.js";

const getAllusers = catchError(async (req, res,next) => {
    const users = await userModel.find();
    res.json({ message: "Success", users });
})

const signUp = catchError(async (req, res,next) => {
    cloudinary.uploader.upload(req.file.path, 
  async (error, result)=> {
    req.body.profilePhoto=result.secure_url
    const user=new userModel(req.body);
    await user.save();
    sendEmail(req.body.name, req.body.email);
    res.status(201).json({ message: "Success" });
});
})

const verifyEmail = catchError(async (req, res,next) => {
    jwt.verify(req.params.token, "emailverification", async (err, decoded) => {
        if (err) { return next(new AppError(err,400))}
        await userModel.findOneAndUpdate({ email: decoded.email }, { verifiedEmail: true })
        res.json({ message: "success" })
    })
})

const logIn =catchError( async (req, res,next) => {
    const user = await userModel.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ userId: user._id, email:user.email, role: user.role },"privatekey123");
        return res.json({ message: "success", token });
    }
    next(new AppError('incorrect email or password',401))
})

const updateUser = catchError(async (req, res,next) => {
   if(req.body.password){
    req.body.password=bcrypt.hashSync(req.body.password,8);
   }
    const user = await userModel.updateOne({_id:req.user.userId}, req.body, { new: true });
    if (user) { res.json({ message: "success", user })}
    else { next(new AppError("no user found",404))}
})

const deleteUser = catchError(async (req, res,next) => {
    const user = await userModel.deleteOne({_id:req.user.userId}, { new: true });
    if (user) { res.json({ message: "success", user })}
    else { next(new AppError("no user found",404)) }
})
export { getAllusers, signUp, verifyEmail, logIn, updateUser, deleteUser }