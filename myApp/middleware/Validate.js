const Joi = require("joi")
const userUpdateValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3),
        email: Joi.string().email().min(10),
        password: Joi.string(),
        phone: Joi.number(),
        avatar: Joi.string(),
        address: Joi.string()
    });
    return schema.validate(data)
}
const workSpaceUpdateValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3),
        userID: Joi.string().min(3),


    });
    return schema.validate(data)
}
const kanbanBoardUpdateValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3),
        user: Joi.string().min(3),
        workSpaceID: Joi.string().min(3)

    });
    return schema.validate(data)
}
const ticketUpdateValidate = (data) => {
    const schema = Joi.object({
        status: Joi.string().min(3),
        member: Joi.string().min(3),
        discribe: Joi.string().min(3),
        kanbanBoardID: Joi.string().min(3)

    });
    return schema.validate(data)
}

module.exports = {
    userUpdateValidate,
    workSpaceUpdateValidate,
    kanbanBoardUpdateValidate,
    ticketUpdateValidate
}