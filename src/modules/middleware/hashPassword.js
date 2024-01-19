import bcrypt from 'bcrypt';
 const hashPassword=(req,_,next)=>{
   req.body.password=  bcrypt.hashSync(req.body.password,8);
    next();
}
export default hashPassword;