import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mocksRouter from './routes/mocks.router.js';
// servidor
const PORT = 8080;
dotenv.config();

const app = express();
app.use(express.json());

// Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error Mongo:', err));

// router
app.use('/api/mocks', mocksRouter);


app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
