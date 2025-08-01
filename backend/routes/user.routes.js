import express from 'express';
import {create, users, deleteUser,user} from '../controllers/usersControllers.js'

const router = express.Router();




router.post('/create', create)

router.get('/users', users)

router.get('/getone/:identifiant', user)

router.delete('/users/:identifiant', deleteUser);


export default router