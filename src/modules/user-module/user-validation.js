import Joi from "joi";

const signupSchemaVal=Joi.object(
    {
        name: Joi.string().min(2).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/^[A-z][a-z0-9#@]{8,20}$/).required(),
        rePassword:Joi.valid(Joi.ref("password")).required(),
        age: Joi.number().integer().required().min(10).max(80),
    }
)
const signInSchemaVal=Joi.object(
    {
       
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/^[A-z][a-z0-9#@]{8,20}$/).required(),
    }
)
export{
    signupSchemaVal,signInSchemaVal
}