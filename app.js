import mongoose from 'mongoose';
import express  from 'express';
import dotenv  from 'dotenv';
import morgan  from 'morgan';
import authRoutes  from './routes/authRoutes.js';
import eventRoutes  from './routes/eventRoutes.js';
import notificationRoutes  from './routes/notificationRoutes.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});