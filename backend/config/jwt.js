require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'votre_clé_secrète_fallback',
  JWT_EXPIRES_IN: '30m',       // Durée accessToken
  REFRESH_TOKEN_EXPIRES_IN: '7d', // Durée refreshToken
};