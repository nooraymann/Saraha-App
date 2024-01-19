let mode="dev";
export const globalError=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    if(mode=="prod") return  res.status(err.statusCode).json({error:err.message});
   return  res.status(err.statusCode).json({Error:err.message,stack:err.stack,status:err.statusCode});
}