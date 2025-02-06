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
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Invalid email address.',
      'any.required': 'Please fill in all required fields',
    }),
  password: Joi.string().required().messages({
    'any.required': 'Please fill in all required fields',
  }),
});
