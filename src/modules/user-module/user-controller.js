import userModel from "../../../Database/models/user-model.js";
import { sendEmail } from "../emails/send-email.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";

const getAllusers = catchError(async (req, res) => {
    const users = await userModel.find();
    res.json({ message: "Success", users });
})
const signUp = async (req, res) => {
    userModel.insertMany(req.body);
    sendEmail(req.body.name, req.body.email);
    res.status(201).json({ message: "Success" });
}
const verifyEmail = async (req, res) => {
    jwt.verify(req.params.token, "emailverification", async (err, decoded) => {
        if (err) { return next(new AppError(err,400))}
        await userModel.findOneAndUpdate({ email: decoded.email }, { verifiedEmail: true })
        res.json({ message: "success" })
    })
}
const logIn = async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ userId: user._id, email:user.email, role: user.role },"privatekey123");
        return res.json({ message: "success", token });
    }
    next(new AppError('incorrect email or password',401))
}

const updateUser = async (req, res) => {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (user) {
        res.json({ message: "success", user })
    }
    else {
        next(new AppError("no user found",404))
    }
}
const deleteUser = async (req, res) => {
    const user = await userModel.findByIdAndDelete(req.params.id, { new: true });
    if (user) {
        res.json({ message: "success", user })
    }
    else {
        next(new AppError("no user found",404))
    }
}
export { getAllusers, signUp, verifyEmail, logIn, updateUser, deleteUser }