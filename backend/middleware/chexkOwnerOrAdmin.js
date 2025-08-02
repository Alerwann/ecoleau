export const checkOwnerOrAdmin = async (req, res, next) => {
  try {
    const { userProfilId } = req.params;
    
    // Admin peut tout voir
    if (req.user.role === 'admin') {
      return next();
    }
    
    // Utilisateur peut voir SES données
    const userProfil = await UserProfil.findById(userProfilId);
    const userAccount = await User.findOne({ userId: userProfilId });
    
    if (userAccount && userAccount._id.toString() === req.user.id) {
      return next();
    }
    
    res.status(403).json({ error: 'Accès refusé' });
    
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};