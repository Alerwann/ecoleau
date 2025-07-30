import jwt from 'jsonwebtoken';
import User from'../models/User.js';
import { JWT_SECRET, JWT_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from'../config/jwt.js';
import{ createRefreshToken} from '../services/tokenServices.js'


export const loginController = async (req,res) =>
  {
    const { identifiant, password } = req.body;
      
    try 
    {
      const user = await User.findOne({ identifiant });
      const isMatch = user && await user.comparePassword(password);
        
      if (!isMatch ) return res.status(401).json({ error: 'Identifiants invalides' });
        
      const accessToken = jwt.sign({ id: user._id , scope : 'acces'}, JWT_SECRET, { expiresIn:JWT_EXPIRES_IN });
      
      const refreshToken = jwt.sign({ id: user.id , scope : 'refresh' }, JWT_SECRET + "_REFRESH", { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
      
       
      await createRefreshToken(user._id, refreshToken);

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

      res.json({ success: true,  user: { id: user._id, identifiant: user.identifiant } });
    } 
      
      catch (err) 
    {
      console.error("Erreur dans /login :", err);
      res.status(500).json({ error: 'Erreur serveur', details: err.message });
    }
};


export const refreshToken = async (req, res) => {
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

export const validateToken = async(req,res)=>{
  res.status(200).json({
    valid:true,
   
  })
}

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (refreshToken) {
    await tokenService.deleteRefreshToken(refreshToken);
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.sendStatus(204);
};


export const logoutAll = async (req, res) => {
  await tokenService.deleteAllRefreshTokensForUser(req.user.id);
  res.json({ message: 'Toutes les sessions ont été invalidées' });
};


export const sessionsget =async (req,res) =>{

  const sessions = await RefreshToken.find({ 
    userId: req.user.id,
    revoked: false,
    expiresAt: { $gt: new Date() }
  }).select('ipAddress userAgent createdAt');
  
  res.json(sessions.map(session => ({
    id: session._id,
    ip: session.ipAddress,
    device: session.userAgent,
    lastActive: session.createdAt
  })));

}



