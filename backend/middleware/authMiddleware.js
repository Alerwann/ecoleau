// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config/jwt.js';

// export const authenticate = (req, res, next) => {
//   const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Token manquant' });

//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) {
//       if (err.name === 'TokenExpiredError') {
//         return res.status(401).json({ error: 'Token expiré', code: 'TOKEN_EXPIRED' });
//       }
//       return res.status(403).json({ error: 'Token invalide' });
//     }
//     req.user = decoded;
//     next();
//   });
// };

import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.js';
import User from '../models/User/User.js';

export const authenticateToken = async (req, res, next) => {
  try {
    // 1. Récupérer le token (privilégier header pour API)
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.accessToken;
    
    if (!token) {
      return res.status(401).json({ error: 'Token manquant' });
    }

    // 2. Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 3. Vérifier que l'utilisateur existe toujours ← IMPORTANT !
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Utilisateur invalide ou inactif' });
    }
    
    // 4. Vérifier le scope (si vous l'utilisez)
    if (decoded.scope !== 'access') {
      return res.status(403).json({ error: 'Token non autorisé pour cette action' });
    }
    
    // 5. Ajouter les infos utilisateur à req
    req.user = {
      id: user._id,
      identifiant: user.identifiant,
      role: user.role
    };
    
    next();
    
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expiré', code: 'TOKEN_EXPIRED' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: 'Token invalide' });
    }
    
    console.error('Erreur authentification:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};