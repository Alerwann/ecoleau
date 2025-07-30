import express from 'express';
import {create, users, deleteUser} from '../controllers/usersControllers.js'

const router = express.Router();




router.post('/create', create)

router.get('/users', users)

router.delete('/users/:identifiant', deleteUser);


export default router