const Joi=require("joi")
const userUpdateValidate=(data)=>{
    const schema=Joi.object({
        name:Joi.string().min(3),
        email:Joi.string().email().min(10),
       password:Joi.string(),
       phone:Joi.number(),
       avatar:Joi.string(),
       address:Joi.string()
    });
    return schema.validate(data)
}
module.exports={
    userUpdateValidate
}