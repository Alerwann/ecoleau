import { createUserProfil, getAllProfils, getUserProfil } from '../controllers/userProfil.controller.js'
import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { checkOwnerOrAdmin } from '../middleware/chexkOwnerOrAdmin.js';

const router = express.Router();

router.post('/create', authenticateToken, createUserProfil)

router.get('/getAll', authenticateToken, getAllProfils)
router.get('/getone/:identifiantRH', authenticateToken,checkOwnerOrAdmin, getUserProfil)



export default router