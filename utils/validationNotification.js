const Joi = require("joi");

const notificationSchema = Joi.object({
  message: Joi.string().required(),
  user: Joi.string().required(),
  read: Joi.boolean().required(),
});

const validateNotification = (data) => {
  return notificationSchema.validate(data);
};

module.exports = {
  validateNotification,
};
