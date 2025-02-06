import Joi from 'joi';

export const schema = Joi.object({
  title: Joi.string().required().empty('').messages({
    'string.empty': 'Review cannot be empty',
    'any.required': 'Please fill in all fields',
  }),
  review: Joi.string().min(20).required().empty('').messages({
    'string.min': 'Review must be at least 20 characters long',
    'string.empty': 'Please fill in all fields',
  }),
  rate: Joi.number().integer().min(1).max(5).required().messages({
    'number.base': 'Rating must be a number',
    'number.min': 'Rating must be at least 1',
    'number.max': 'Rating must be at most 5',
    'any.required': 'Please fill in all fields',
  }),
});
