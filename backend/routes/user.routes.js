import express from 'express';
import {createUser, users, deleteUser,user} from '../controllers/usersControllers.js'

const router = express.Router();




router.post('/createuser', createUser)

router.get('/users', users)

router.get('/getone/:identifiant', user)

router.delete('/users/:identifiant', deleteUser);


export default router