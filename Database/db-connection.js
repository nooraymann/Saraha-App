import mongoose from "mongoose";
export default function dbConnection(){
    mongoose.connect("mongodb://127.0.0.1:27017/sarahaApp").then(()=>console.log(`Database connected successfully`));
}
