import express  from 'express';
import dotenv  from 'dotenv';
import { sequelize } from '../models/index.js';
 import app  from './app.js';
import http  from 'http';
import socketIo  from 'socket.io';

dotenv.config();

const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

sequelize.sync()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });