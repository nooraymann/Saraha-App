import mongoose from "mongoose";
const userSchema = mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, unique: true, required: true},
        password: { type: String },
        age: { type: Number,min:12,max:80 },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        verifiedEmail: {type: Boolean, default: false},
        isActive:{type:Boolean, default:true},
        messages:[{type:mongoose.Types.ObjectId,ref:"message"}]
    },{timestamps:true}
)
 const userModel=mongoose.model("user",userSchema);
 export default userModel;