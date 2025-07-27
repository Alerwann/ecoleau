const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET, JWT_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } = require('../config/jwt');
const tokenService = require('../services/tokenServices')


exports.login = async (req,res) =>
  {
    const { identifiant, password } = req.body;
      
    try 
    {
      const user = await User.findOne({ identifiant });
        
      if (!user) return res.status(401).json({ error: 'Identifiants invalides' });
    
      const isMatch = await user.comparePassword(password);
        
      if (!isMatch) return res.status(401).json({ error: 'Identifiants invalides' });
        
      const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn:JWT_EXPIRES_IN });
      
      const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET + "_REFRESH", { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
      
       
      await tokenService.createRefreshToken(user._id, refreshToken);

      res.cookie('accessToken', accessToken, 
        { 
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 30 * 60 * 1000
        });
  
        res.cookie('refreshToken', refreshToken, 
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
           maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours en ms
        });

      res.json({ success: true,  user: { id: user._id, identifiant: user.identifiant , accessToken , refreshToken} });
    } 
      
      catch (err) 
    {
      console.error("Erreur dans /login :", err);
      res.status(500).json({ error: 'Erreur serveur', details: err.message });
    }
};


exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  // 1. Vérification en base
  if (!refreshToken || !(await tokenService.verifyRefreshToken(refreshToken))) {
    return res.status(403).json({ error: 'RefreshToken invalide' });
  }

  try {
    // 2. Vérification JWT
    const decoded = jwt.verify(refreshToken, JWT_SECRET + "_REFRESH");
    
    // 3. Nouvel accessToken
    const newAccessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
    res.cookie('accessToken', newAccessToken, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    await tokenService.deleteRefreshToken(refreshToken); // Nettoie si token invalide
    res.status(403).json({ error: 'Session expirée, veuillez vous reconnecter' });
  }
};

exports.validateToken = async(req,res)=>{
  res.status(200).json({
    valid:true,
   
  })
}

exports.logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (refreshToken) {
    await tokenService.deleteRefreshToken(refreshToken);
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.sendStatus(204);
};
exports.invalidateAllSessions = async (req, res) => {
  await tokenService.deleteAllRefreshTokensForUser(req.user.id);
  res.json({ message: 'Toutes les sessions ont été invalidées' });
};

exports.create = async(req,res)=>{
    try{
        const{identifiant, password, nom, prenom} =req.body;

        if (!identifiant || !password || !nom || !prenom)
        {
            return res.status(400).json({message : 'tous les champs sont requis'});

        }
    const newUser = new User({
        identifiant,
        password,
        nom,
        prenom
    })
const savedUser = await newUser.save();
// Puis vous pouvez directement modifier l'objet

   const userResponse = {
      _id: savedUser._id,
      nom: savedUser.nom,
      prenom : savedUser.prenom,
      identifiant: savedUser.identifiant,
      // Ne pas inclure le password !
      __v: savedUser.__v
    };

    res.status(201).json({
        message: 'utilisateur créé avec succès',
        user : userResponse
    });
    }catch (error) { 
    console.error('Erreur lors de la création:', error);

    
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Un utilisateur avec cet identifiant existe déjà'
      });
    }

    // Erreur serveur générique
    return res.status(500).json({ 
      message: 'Erreur lors de la création de l\'utilisateur',
      error: error.message 
    });
  }
};

exports.users = async (req, res) => {
  try {
    const users = await User.find({}, 'identifiant'); 
    
    res.status(200).json({
      count: users.length,
      identifiants: users.map(user => user.identifiant)
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération',
      error: error.message 
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await User.deleteOne({ identifiant: req.params.identifiant });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé avec cet identifiant' });
    }

    res.status(200).json({ 
      message: 'Utilisateur supprimé avec succès',
      identifiant: req.params.identifiant
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la suppression',
      error: error.message 
    });
  }
}