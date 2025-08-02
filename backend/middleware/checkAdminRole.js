export const checkAdminRole = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentification requise' });
  }
  
  if (!['admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Accès refusé - Rôle administrateur requis' });
  }
  
  next();
};