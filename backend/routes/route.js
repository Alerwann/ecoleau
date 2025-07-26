const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers');

// POST /api/login -> identification
router.post('/login', authController.login)


// POST /api/create -> création de personnes
router.post('/create', authController.create)

// GET /api/users -> retour de la liste des identifiants
router.get('/users', authController.users)

// DELET /api/:identifiant

router.delete('/users/:identifiant', authController.delete);


module.exports = router;