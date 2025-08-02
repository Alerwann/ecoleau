export const checkOwnerOrAdmin = async (req, res, next) => {
  try {
    const { userProfilId } = req.params;
    
    // Admin peut tout voir
    if (req.user.role === 'admin' || req.user.role =='manager') {
      return next();
    }
    
    // Si vous stockez userId dans req.user lors de l'authentification
    if (req.user.userId && req.user.userId.toString() === userProfilId) {
      return next();
    }
    
    res.status(403).json({ error: 'Accès refusé' });
    
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};