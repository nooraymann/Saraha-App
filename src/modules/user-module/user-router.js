import {Router} from "express";
import * as userController from "./user-controller.js"
import checkEmail from "../middleware/checkEmail.js"
// import hashPassword from "../middleware/hashPassword.js"
import { auth } from "../middleware/auth.js";
import { validator } from "../middleware/validation.js";
import * as userValidation from "./user-validation.js";
import { singleUpload } from "../../file-upload/uploads.js";
 const  userRouter= Router();
 userRouter.get("/users",auth,userController.getAllusers);
 userRouter.post("/signUp",singleUpload("profilePhoto"),validator(userValidation.signupSchemaVal),checkEmail,userController.signUp);
 userRouter.get("/verify/:token",userController.verifyEmail);
 userRouter.post("/logIn",validator(userValidation.signInSchemaVal),userController.logIn);
 userRouter.put("/updateUser/:id",auth,validator(userValidation.updateSchemaVal),userController.updateUser); 
userRouter.delete("/deleteUser/:id",auth,userController.deleteUser); 
 export default userRouter;
