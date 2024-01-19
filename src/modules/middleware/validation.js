import Joi from "joi"
import { AppError } from "../../utils/AppError.js";

export const validator=(schema)=>{
    return(req,_,next)=>{
        const {error}=schema.validate({...req.body,...req.params,...req.query},{abortEarly:false})
        console.log(error);
        if(!error) {
            next();
        }
       else{ 
        let messages=[];
        error.details.map((msg)=>{messages.push(msg.message)});
        next(new AppError(messages,401))
        }
    }
}