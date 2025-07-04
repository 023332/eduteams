import express from 'express';
import  sequelize  from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import teamRoutes from './routes/team.routes.js';
import courseRoutes from './routes/course.routes.js';
import lessonRoutes from './routes/lesson.routes.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));


app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);


const startServer = async () => {
  try {
    await sequelize.sync();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();