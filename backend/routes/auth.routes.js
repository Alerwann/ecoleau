import express from 'express';
import {login, refreshToken, logout, logoutAll, getSession, revokeSession} from '../controllers/auth.controllers.js'
import { loginLimiter } from '../middleware/rate-limiter.js';
const router = express.Router();




router.post('/login',loginLimiter, login)
router.post('/refresh-token',refreshToken);
router.post('/logout', logout);
router.post('/logoutall', logoutAll);
router.get('/getSession', getSession);
router.post('/revokesession', revokeSession)





export default router