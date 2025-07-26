require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const AuthRoutes = require ('./routes/route')

// Initialisation
const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Connexion DB
connectDB();

// Routes

app.use('/api', AuthRoutes)


module.exports = app;