import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import UserProfilRoutes from './userProfil.routes.js'

const router = express.Router();

// Aggrégation de toutes les routes
router.use('/auth', authRoutes);    // Préfixe '/auth' pour toutes ces routes
router.use('/user', userRoutes);   // Préfixe '/users'
router.use('/profils', UserProfilRoutes) // préfixe '/profils

// Export unique à importer dans app.js
export default router;