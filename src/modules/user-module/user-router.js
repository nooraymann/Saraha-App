import {Router} from "express";
import * as userController from "./user-controller.js"
import checkEmail from "../middleware/checkEmail.js"
import hashPassword from "../middleware/hashPassword.js"
import { auth } from "../middleware/auth.js";
import { validator } from "../middleware/validation.js";
import * as userValidation from "./user-validation.js";
 const  userRouter= Router();
 userRouter.get("/users",auth,userController.getAllusers);
 userRouter.post("/signUp",validator(userValidation.signupSchemaVal),checkEmail,hashPassword,userController.signUp);
 userRouter.get("/verify/:token",userController.verifyEmail);
 userRouter.post("/logIn",validator(userValidation.signInSchemaVal),userController.logIn);
 userRouter.put("/updateUser/:id",auth,userController.updateUser); 
userRouter.delete("/deleteUser/:id",auth,userController.deleteUser); 
 export default userRouter;
