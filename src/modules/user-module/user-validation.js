import Joi from "joi";

const signupSchemaVal=Joi.object(
    {   name: Joi.string().min(2).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/^[A-z][a-z0-9#@]{8,20}$/).required(),
        rePassword:Joi.valid(Joi.ref("password")).required(),
        age: Joi.number().integer().required().min(10).max(80).required(),
        profilePhoto:Joi.object({
            size:Joi.number().positive().required(),
            filename:Joi.string().required(),
            path:Joi.string().required(),
            mimetype:Joi.string().required(),
            destination:Joi.string().required(),
            encoding:Joi.string().required(),
            originalname:Joi.string().required(),
           fieldname:Joi.string().required()
        }),
        
    }
)
const signInSchemaVal=Joi.object(
    {   email: Joi.string().email().required(),
        password: Joi.string().pattern(/^[A-z][a-z0-9#@]{8,20}$/).required(),
    }
)
const updateSchemaVal=Joi.object(
    {   id:Joi.string().hex().length(24),
        name: Joi.string().min(2).max(20),
        email: Joi.string().email(),
        password: Joi.string().pattern(/^[A-z][a-z0-9#@]{8,20}$/),
        rePassword:Joi.valid(Joi.ref("password")),
        age: Joi.number().integer().min(10).max(80),
        profilePhoto:Joi.object({
            size:Joi.number().positive().required(),
            filename:Joi.string().required(),
            path:Joi.string().required(),
            mimetype:Joi.string().required(),
            destination:Joi.string().required(),
            encoding:Joi.string().required(),
            originalname:Joi.string().required(),
           fieldname:Joi.string().required()
        }),
    }
)

export{
    signupSchemaVal,signInSchemaVal,updateSchemaVal
}