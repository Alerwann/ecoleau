require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Initialisation
const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', // Remplacez par l'URL de votre front
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Connexion DB
connectDB();

// Routes
app.use('/api', require('./routes/route'));

module.exports = app;