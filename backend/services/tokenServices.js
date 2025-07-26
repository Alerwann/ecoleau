const RefreshToken = require('../models/refreshToken');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

module.exports = {
  // Ajoute un refreshToken en base
  createRefreshToken: async (userId, token) => {
    await RefreshToken.create({ token, userId });
  },

  // Vérifie si un refreshToken est valide
  verifyRefreshToken: async (token) => {
    const storedToken = await RefreshToken.findOne({ token });
    return !!storedToken; // Retourne true si trouvé, false sinon
  },

  // Supprime un refreshToken (pour le logout)
  deleteRefreshToken: async (token) => {
    await RefreshToken.deleteOne({ token });
  },

  // Supprime tous les refreshTokens d'un utilisateur (optionnel)
  deleteAllRefreshTokensForUser: async (userId) => {
    await RefreshToken.deleteMany({ userId });
  }
};