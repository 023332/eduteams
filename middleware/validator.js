import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('student', 'teacher').required()
});

export const courseSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(1000).optional(),
  teamId: Joi.number().integer().positive().required(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional()
});

export const lessonSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().max(5000).optional(),
  courseId: Joi.number().integer().positive().required(),
  order: Joi.number().integer().min(0).optional(),
  duration: Joi.number().integer().min(0).max(1440).optional(), // Max 24 hours
  videoUrl: Joi.string().uri().optional()
});

export const teamSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(500).optional()
});

export function validateRegistration(req, res, next) {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

export function validateCourse(req, res, next) {
  const { error } = courseSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

export function validateLesson(req, res, next) {
  const { error } = lessonSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

export function validateTeam(req, res, next) {
  const { error } = teamSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}