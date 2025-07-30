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

app.use(express.json());

app.use(cookieParser());


// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(globalLimiter)

// Connexion DB
connectDB();

app.use((req, res, next) => {
  console.log('Cookies reçus :', req.cookies); // Debug (à retirer en prod)
  next();
});

app.use('/api', mainRouter)


export default app;