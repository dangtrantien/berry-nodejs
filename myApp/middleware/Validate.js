const Joi = require("joi");

const userUpdateValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email().min(10),
    password: Joi.string(),
    avatar: Joi.string().allow(""),
    gender: Joi.string(),
    address: Joi.string(),
  });

  return schema.validate(data);
};

const workSpaceUpdateValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3),
    userID: Joi.string().min(3),
  });

  return schema.validate(data);
};

const ticketUpdateValidate = (data) => {
  const schema = Joi.object({
    workSpaceID: Joi.string().min(3),
    name: Joi.string().min(3),
  });

  return schema.validate(data);
};

const taskUpdateValidate = (data) => {
  const schema = Joi.object({
    ticketID: Joi.string().min(3),
    describe: Joi.string().min(3),
    status: Joi.string().min(3),
  });

  return schema.validate(data);
};

const commentUpdateValidate = (data) => {
  const schema = Joi.object({
    message: Joi.string().min(3),
    senderID: Joi.string().min(3),
    taskID: Joi.string().min(3),
  });

  return schema.validate(data);
};

module.exports = {
  userUpdateValidate,
  workSpaceUpdateValidate,
  ticketUpdateValidate,
  taskUpdateValidate,
  commentUpdateValidate,
};
