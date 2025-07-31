import { config } from 'dotenv';
config();


import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import mainRouter from './routes/index.js'
import cookieParser from 'cookie-parser' ;
import { globalLimiter } from './middleware/rate-limiter.js';

// Initialisation
const app = express();


app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());



// app.use(globalLimiter)



app.use((req, res, next) => {
  console.log('Cookies reçus :', req.cookies);
   console.log('Route appelée :', req.path); // Debug (à retirer en prod)
  next();
});

connectDB();

app.use('/api', mainRouter)



export default app;