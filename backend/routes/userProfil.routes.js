import { createUserProfil, getAllProfils, getUserProfil, updateUserProfil } from '../controllers/userProfil.controller.js'
import express from 'express';
import { authenticateToken } from '../middleware/authentification/authMiddleware.js';
import { checkOwnerOrAdmin } from '../middleware/checkrole/checkOwnerOrAdmin.js';
import { checkAdminRole } from '../middleware/checkrole/checkAdminRole.js';
import { checkManagerOrAdmin} from '../middleware/checkrole/checkManagerOrAdmin.js'

const router = express.Router();



router.get('/getAll', authenticateToken, checkManagerOrAdmin, getAllProfils)
router.get('/getone/:identifiantRH', authenticateToken,checkOwnerOrAdmin, getUserProfil)

router.post('/create', authenticateToken, checkAdminRole, createUserProfil)
router.patch('/update/:identifiantRH', authenticateToken, checkAdminRole, updateUserProfil)



export default router