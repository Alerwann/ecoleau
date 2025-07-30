import express from 'express';
import {loginController, refreshToken, logout} from '../controllers/auth.controllers.js'
import { loginLimiter } from '../middleware/rate-limiter.js';
const router = express.Router();




router.post('/login',loginLimiter, loginController)
router.post('/refresh-token',refreshToken);
router.post('/logout', logout);





export default router