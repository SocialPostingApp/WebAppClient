import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z0-9]+$/)
    .max(20)
    .required()
    .messages({
      'string.pattern.base': 'Name can only contain letters and numbers',
      'string.max': 'Name cannot be longer than 20 characters',
      'any.required': 'Please fill in all required fields',
    }),
});
