const Joi = require('joi');

const userRegistrationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('student', 'teacher').required()
});

const userLoginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

const courseSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).required()
});

const lessonSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(10).required(),
    courseId: Joi.number().integer().required()
});

const validateUserRegistration = (data) => {
    return userRegistrationSchema.validate(data);
};

const validateUserLogin = (data) => {
    return userLoginSchema.validate(data);
};

const validateCourse = (data) => {
    return courseSchema.validate(data);
};

const validateLesson = (data) => {
    return lessonSchema.validate(data);
};

module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateCourse,
    validateLesson
};