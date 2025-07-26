require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const AuthRoutes = require ('./routes/route')
const cookieParser = require('cookie-parser');

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


// Connexion DB
connectDB();

app.use((req, res, next) => {
  console.log('Cookies reçus :', req.cookies); // Debug (à retirer en prod)
  next();
});

app.use('/api', AuthRoutes)


module.exports = app;