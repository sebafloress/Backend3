import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database.js';
import { errorHandler } from './middlewares/errorHandler.js';
import mocksRouter from './routes/mocks.routes.js';
import usersRouter from './routes/users.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
await connectDB();

// Routes
app.use('/api/mocks', mocksRouter); // ✅ Este es el que importa en este paso
app.use('/api/users', usersRouter);

// Health Check
app.get('/ping', (req, res) => res.send('pong'));

// Error Handling
app.use(errorHandler);

export default app;
