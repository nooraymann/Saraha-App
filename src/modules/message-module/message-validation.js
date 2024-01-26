import Joi from"joi";

const addmessageVal=Joi.object({
    message:Joi.string().min(2).max(200).required(),
    receivedId:Joi.string().hex().length(24).required()

})
export{
    addmessageVal,
}