import  Lesson  from '../models/lesson.model.js';
import  Course  from '../models/course.model.js';
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


export const createLesson = async (req, res) => {
  try {

    const { error } = validateLesson(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    
    const { title, content, courseId, order, duration, videoUrl } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const lesson = await Lesson.create({
        title,
        content,
        fileUrl,
        courseId,
        order: order ? parseInt(order) : null,
        duration: duration ? parseInt(duration) : null,
        videoUrl
    });
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Error creating lesson', error });
  }
};


export const uploadFile = upload.single('file');


export const getLessonsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const lessons = await Lesson.findAll({ where: { courseId } });

    if (req.headers['content-type'] === 'application/json') {
      return res.status(200).json(lessons);
    }

    res.render('lessons/list', { lessons, courseId });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving lessons', error });
  }
};

export const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    

    const lesson = await Lesson.findByPk(id);
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    

    let enrollment = null;
    if (req.user && req.user.role === 'student') {
        const Enrollment = (await import('../models/index.js')).Enrollment;
        enrollment = await Enrollment.findOne({
            where: { userId: req.user.id, courseId: lesson.courseId }
        });
    }
    
    res.render('lessons/detail', { lesson, user: req.user, enrollment });
  } catch (error) {
    console.error('Error retrieving lesson:', error);
    res.status(500).json({ message: 'Error retrieving lesson', error });
  }
};

export const createLessonForm = async (req, res) => {
    try {
        const { courseId } = req.query;
        

        const course = await Course.findByPk(courseId);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        res.render('lessons/create', { course, user: req.user });
    } catch (error) {
        console.error('Error loading lesson creation form:', error);
        res.status(500).json({ message: 'Error loading lesson creation form', error });
    }
};

export const getLessonEditForm = async (req, res) => {
    try {
        const { id } = req.params;
        

        const lesson = await Lesson.findByPk(id);
        
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        

        const course = await Course.findByPk(lesson.courseId);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        res.render('lessons/edit', { lesson, course, user: req.user });
    } catch (error) {
        console.error('Error loading lesson edit form:', error);
        res.status(500).json({ message: 'Error loading lesson edit form', error });
    }
};


export const updateLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, courseId, order, duration, videoUrl } = req.body;
        const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
        
        const lesson = await Lesson.findByPk(id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        
        await lesson.update({
            title,
            content,
            fileUrl,
            courseId,
            order: order ? parseInt(order) : null,
            duration: duration ? parseInt(duration) : null,
            videoUrl
        });
        

        if (req.headers['content-type'] === 'application/json') {
            return res.status(200).json(lesson);
        }
        

        res.redirect(`/lessons/${id}`);
    } catch (error) {
        res.status(500).json({ message: 'Error updating lesson', error });
    }
};


export const deleteLesson = async (req, res) => {
    try {
        const { id } = req.params;
        
        const lesson = await Lesson.findByPk(id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        
        await lesson.destroy();
        

        if (req.headers['content-type'] === 'application/json') {
            return res.status(200).json({ message: 'Lesson deleted successfully' });
        }
        

        res.redirect(`/courses/${lesson.courseId}`);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting lesson', error });
    }
};