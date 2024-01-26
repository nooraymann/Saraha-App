import Jwt from "jsonwebtoken";
import userModel from "../../../Database/models/user-model.js";
import { AppError } from "../../utils/AppError.js";

export const auth = async (req, res, next) => {
    const token = req.headers.token;

    Jwt.verify(token, "privatekey123", async (err, decoded) => {
        if (err) return next(new AppError(err, 401))
        const user = await userModel.findById(decoded.userId, "isActive verifiedEmail");
        if (!user) return next(new AppError("no user found", 404))
        if (user.isActive == false) return next(new AppError("this acount is deactivated", 403));
        if (user.verifiedEmail == false) return next(new AppError("you must verify your email", 403));
        req.user = decoded;
        next();
    });
}
