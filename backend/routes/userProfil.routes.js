import { createUserProfil, getAllProfils, getUserProfil, updateUserProfil } from '../controllers/userProfil.controller.js'
import express from 'express';
import { authenticateToken } from '../middleware/authentification/authMiddleware.js';
import { checkOwnerOrAdmin } from '../middleware/check role/chexkOwnerOrAdmin.js';
import { checkAdminRole } from '../middleware/check role/checkAdminRole.js';
import { checkManagerOrAdmin} from '../middleware/check role/checkManagerOrAdmin.js'

const router = express.Router();

router.post('/create', authenticateToken, createUserProfil)

router.get('/getAll', authenticateToken, checkManagerOrAdmin, getAllProfils)
router.get('/getone/:identifiantRH', authenticateToken,checkOwnerOrAdmin, getUserProfil)

router.put('/update/identifiantRH', authenticateToken, checkAdminRole, updateUserProfil)



export default router