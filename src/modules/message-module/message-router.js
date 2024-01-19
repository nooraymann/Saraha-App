import { auth } from "../middleware/auth.js";
import { validator } from "../middleware/validation.js";
import * as messageController from "./message-controller.js";
import { Router } from "express";
import * as msgValidation  from "./message-validation.js";
const messageRouter= Router();
messageRouter.route("/messages").get(auth,messageController.getAllmessages).post(validator(msgValidation.addmessageVal),auth,messageController.addMessage);
messageRouter.get("/profile",messageController.shareProfile)
export default messageRouter;
