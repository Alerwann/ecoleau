import { createUserProfil, getAllProfils, getUserProfil, updateUserProfil,getUserProfilByid } from '../controllers/userProfil.controller.js'
import express from 'express';
import { authenticateToken } from '../middleware/authentification/authMiddleware.js';
// import { checkOwnerOrAdmin } from '../middleware/checkrole/checkOwnerOrAdmin.js';
import { checkRoles } from '../middleware/checkrole/checkRoles.js';

const router = express.Router();



router.get('/getAll',   getAllProfils)

router.get('/getone/:identifiantRH', authenticateToken, getUserProfil)

router.get('/getonebyid/:id', authenticateToken, checkRoles('admin'), getUserProfilByid)

router.post('/create', authenticateToken, checkRoles('admin'), createUserProfil)
router.patch('/update/:identifiantRH', authenticateToken, checkRoles('admin', 'manager'), updateUserProfil)



export default router