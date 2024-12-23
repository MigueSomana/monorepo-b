import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import contactRoutes from './routes/contactRoutes';
import operationRoutes from './routes/operationRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', contactRoutes);
app.use('/api', operationRoutes);

// Conectar a MongoDB y iniciar servidor
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });

export default app;