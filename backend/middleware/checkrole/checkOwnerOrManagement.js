// middlewares/roles.js
export const checkOwnerOrManagement = async (req, res, next) => {
  try {
    const { identifiantRH } = req.params;
    
    // IT et RH ont accès à tout
    if (['it', 'rh'].includes(req.user.role)) {
      return next();
    }
    
    // Manager peut voir son équipe
    if (req.user.role === 'manager') {
      const profil = await UserProfil.findOne({ identifiantRH });
      const userAccount = await User.findOne({ userId: profil._id });
      
      // Vérifier si c'est dans son équipe (logique à adapter)
      if (await isInManagerTeam(req.user.id, userAccount._id)) {
        return next();
      }
    }
    
    // Conseiller peut voir seulement son profil
    if (req.user.role === 'conseiller') {
      const userAccount = await User.findOne({ identifiant: req.user.identifiant });
      const profil = await UserProfil.findById(userAccount.userId);
      
      if (profil.identifiantRH === identifiantRH) {
        return next();
      }
    }
    
    res.status(403).json({ error: 'Accès refusé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};