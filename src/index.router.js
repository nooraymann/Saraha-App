
process.on("uncaughtException", (err) => {
    console.log("Error: ", err);
})
import dbConnection from "../Database/db-connection.js";
import messageRouter from "./modules/message-module/message-router.js";
import userRouter from "./modules/user-module/user-router.js";
import { serializeError } from 'serialize-error';
import { AppError } from "./utils/AppError.js";
import { globalError } from "./modules/middleware/globalErrorHandler.js";
import dotenv from "dotenv";

export function bootsrtap(app, express) {
    dotenv.config();
    dbConnection();
    app.use(express.json());
    app.use("/users", userRouter);
    app.use("/messages", messageRouter);
    app.use("*", (req, res, next) => {
        const err = new AppError(`not found endpint :${req.originalUrl} , method: ${req.method}`, 404);
        // const stringifiedError = serializeError(err);
        //     next(stringifiedError);
        next(err);
    })
    process.on('unhandledRejection', (err) => {
        console.log('Error:', err);
      });
  
    //global error handling Middleware
    app.use(globalError);
    
}