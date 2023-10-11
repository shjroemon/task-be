const Joi = require("joi");

const createProjectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

const editProjectSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
});

const validateCreateProject = (data) => {
  return createProjectSchema.validate(data);
};

const validateEditProject = (data) => {
  return editProjectSchema.validate(data);
};

module.exports = {
  validateCreateProject,
  validateEditProject,
};
