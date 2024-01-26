import express from "express";
import { bootsrtap } from "./src/index.router.js";


const app=express();
const port=3200;
app.use("/",express.static("uploads"))


bootsrtap(app,express);

app.listen(port,console.log(`server is running on ${port}`));