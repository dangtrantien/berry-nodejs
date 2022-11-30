const Joi = require("joi");

const userUpdateValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().min(10),
    password: Joi.string(),
    avatar: Joi.string().allow(""),
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
    userIDs: Joi.array(),
    logo: Joi.string().allow(""),
  });

  return schema.validate(data);
};

const boardUpdateValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    workSpaceID: Joi.string(),
    userIDs: Joi.array(),
    bgImg: Joi.string().allow(""),
  });

  return schema.validate(data);
};

const taskUpdateValidate = (data) => {
  const schema = Joi.object({
    task: Joi.string(),
    describe: Joi.string(),
    status: Joi.number().max(3),
    boardID: Joi.string(),
    userIDs: Joi.array(),
  });

  return schema.validate(data);
};

const commentUpdateValidate = (data) => {
  const schema = Joi.object({
    message: Joi.string(),
    taskID: Joi.string(),
    img: Joi.string().allow(""),
  });

  return schema.validate(data);
};

module.exports = {
  userUpdateValidate,
  workSpaceUpdateValidate,
  boardUpdateValidate,
  taskUpdateValidate,
  commentUpdateValidate,
};
