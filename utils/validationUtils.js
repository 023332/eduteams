import Joi from 'joi';

export const userRegistrationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const eventCreationSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).required(),
    date: Joi.date().iso().required(),
    location: Joi.string().min(3).max(100).required(),
    image: Joi.string().required(),
});