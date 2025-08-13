import express from 'express';
import  sequelize  from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import teamRoutes from './routes/team.routes.js';
import courseRoutes from './routes/course.routes.js';
import lessonRoutes from './routes/lesson.routes.js';
import enrollmentRoutes from './routes/enrollment.routes.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));


app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {

  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    res.render('home', { user: null });
  } else {
    res.render('home', { user: null });
  }
});


app.get('/dashboard', (req, res) => {
  res.render('dashboard/student', { user: null, teams: [] });
});

app.get('/dashboard/teacher', (req, res) => {
  res.render('dashboard/teacher', { user: null, teams: [] });
});


app.get('/teams', (req, res) => {
  res.render('teams/list', { teams: [] });
});

app.get('/courses', (req, res) => {
  res.render('courses/list', { courses: [] });
});

app.get('/enrollments', (req, res) => {
  res.render('enrollments/list', { enrollments: [], user: null });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/privacy', (req, res) => {
  res.render('privacy');
});

app.get('/terms', (req, res) => {
  res.render('terms');
});

app.use('/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/enrollments', enrollmentRoutes);

const startServer = async (port = process.env.PORT || 3000, attempts = 0) => {
  const portNumber = parseInt(port, 10);
  
  try {
    await sequelize.sync();
    console.log(' Database synchronized successfully.');
    
    const server = app.listen(portNumber, () => {
      console.log(`Server is running on port ${portNumber}`);
    });
    

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        if (attempts < 5) {
          const nextPort = portNumber + 1;
          console.log(`Port ${portNumber} is already in use. Trying ${nextPort}...`);
          startServer(nextPort, attempts + 1);
        } else {
          console.error('Unable to find an available port after 5 attempts.');
          process.exit(1);
        }
      } else {
        console.error('Server error:', error);
      }
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();