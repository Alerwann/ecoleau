
import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 3, // 3 tentatives max
  message: 'Trop de tentatives de connexion. Réessayez dans 5 minutes.',
  skipSuccessfulRequests: true, // Ne compte pas les succès
  standardHeaders: true, // Retourne les infos dans les headers `RateLimit-*`
  legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
handler: (req, res) => {
    res.status(429).json({
      error: 'Trop de tentatives',
      nextAttempt: new Date(Date.now() + 5 * 60 * 1000).toISOString()
    });
  }
});

export const globalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 1000 // Limite globale pour l'API
});