import express from 'express';
import {createUser, users, deleteUser,user} from '../controllers/usersControllers.js'
import { checkRoles } from '../middleware/checkrole/checkRoles.js';
import { checkOwnerOrAdmin } from '../middleware/checkrole/checkOwnerOrAdmin.js';
import { authenticateToken } from '../middleware/authentification/authMiddleware.js';

const router = express.Router();




router.post('/createuser',  createUser)

router.get('/users',authenticateToken, users)

router.get('/getone/:identifiant',authenticateToken, user)

router.delete('/users/:identifiant',authenticateToken,  deleteUser);


export default router