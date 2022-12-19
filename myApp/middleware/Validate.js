const Joi = require("joi");

const userUpdateValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().min(10),
    password: Joi.string(),
    avatar: Joi.object(),
    gender: Joi.string(),
    group: Joi.string().allow(""),
    position: Joi.string().allow(""),
    address: Joi.string().allow(""),
  });

  return schema.validate(data);
};

const workSpaceUpdateValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    userID: Joi.string(),
    member: Joi.array(),
    logo: Joi.object(),
  });

  return schema.validate(data);
};

const boardUpdateValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    workSpaceID: Joi.string(),
    userID: Joi.string(),
    member: Joi.array(),
    bgImg: Joi.object(),
  });

  return schema.validate(data);
};

const taskUpdateValidate = (data) => {
  const schema = Joi.object({
    task: Joi.string(),
    describe: Joi.string().allow(""),
    status: Joi.number().max(3),
    boardID: Joi.string(),
    image: Joi.array(),
    audio: Joi.array(),
    document: Joi.array(),
    member: Joi.array(),
  });

  return schema.validate(data);
};

module.exports = {
  userUpdateValidate,
  workSpaceUpdateValidate,
  boardUpdateValidate,
  taskUpdateValidate,
};
