const Joi = require("joi");

const validation = {};

validation.validateRegistration = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

validation.validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};
validation.validateCreateTask = (data) => {
  const schema = Joi.object({
    // Define validation rules for creating a task
    // For example:
    title: Joi.string().required(),
    description: Joi.string().required(),
    assignedTo: Joi.string().required(),
    // ...
  });

  return schema.validate(data);
};

validation.validateUpdateTask = (data) => {
  const schema = Joi.object({
    // Define validation rules for updating a task
    // For example:
    _id: Joi.string().required(),
    // ...
  });

  return schema.validate(data);
};
module.exports = validation;
