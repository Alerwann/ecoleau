import RefreshToken from '../models/refreshToken.js';




  // Ajoute un refreshToken en base
export const createRefreshToken = async (userId, token, req) => {
  try{
    await RefreshToken.create({ 
    token, 
    userId,
    ipAddress: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent')
  });}
  catch (error) {
    console.error('Erreur création refresh token:', error);
    throw new Error('Impossible de créer le refresh token');
  }
 
  };
  


  // Vérifie si un refreshToken est valide
 export const verifyRefreshToken= async (token) => {
    const storedToken = await RefreshToken.findOne({ token });
    return !!storedToken; // Retourne true si trouvé, false sinon
  };

  // Supprime un refreshToken (pour le logout)
  export const deleteRefreshToken=async (token) => {
    await RefreshToken.deleteOne({ token });
  };
  // Supprime tous les refreshTokens d'un utilisateur 
 export const deleteAllRefreshTokensForUser= async (userId) => {
    await RefreshToken.deleteMany({ userId });
  }
