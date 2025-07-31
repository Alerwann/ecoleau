import jwt from "jsonwebtoken";
import User from "../models/User.js";

import {
  JWT_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  JWT_SECRET,
  REFRESH_TOKEN_EXPIRE_IN,
} from "../config/jwt.js";
import RefreshToken from "../models/refreshToken.js";
import {
  createRefreshToken,
  deleteRefreshToken,
  deleteAllRefreshTokensForUser,
  verifyRefreshToken

} from "../services/tokenServices.js";

export const login = async (req, res) => {
  const { identifiant, password } = req.body;

  try {
    const user = await User.findOne({ identifiant });
    const isMatch = user && (await user.comparePassword(password));

    if (!isMatch)
      return res.status(401).json({ error: "Identifiants invalides" });

    const accessToken = jwt.sign(
      { id: user._id, scope: "access" },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      { id: user._id, scope: "refresh" },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRE_IN }
    );

    await createRefreshToken(user._id, refreshToken, req);

    console.log("🍪 TENTATIVE DE CRÉATION COOKIE");
    console.log(
      "RefreshToken à stocker:",
      refreshToken.substring(0, 20) + "..."
    );
    console.log("NODE_ENV:", process.env.NODE_ENV);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours en ms,
      // domain: "localhost",
    });
    console.log("✅ Cookie défini côté serveur");

    res.json({
      success: true,
      accessToken,
      user: { id: user._id, identifiant: user.identifiant },debug: {cookieSet:true}
    });
  } catch (err) {
    console.error("Erreur dans /login :", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  // 1. Vérification en base
  if (!refreshToken || !(await verifyRefreshToken(refreshToken))) {
    return res.status(403).json({ error: "RefreshToken invalide" });
  }

  try {
    // 2. Vérification JWT
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    // 3. Nouvel accessToken

    const user = await User.findById(decoded.id);

    if (!user) {
      await tokenService.deleteRefreshToken(refreshToken);

      return res.status(403).json({ error: "Utilisateur introuvable" });
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id, scope: "access" },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      accessToken: newAccessToken,
      user: { id: user._id, identifiant: user.identifiant },
    });
  } catch (err) {
    await tokenService.deleteRefreshToken(refreshToken); // Nettoie si token invalide
    res
      .status(403)
      .json({ error: "Session expirée, veuillez vous reconnecter" });
  }
};

// export const validateToken = async(req,res)=>{
//   res.status(200).json({
//     valid:true,

//   })
// }

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    try {
      await deleteRefreshToken(refreshToken);
    } catch (error) {
      console.error("Erreur suppression refresh token:", error);
    }
  }

  res.clearCookie("refreshToken");
  res.sendStatus(204);
};

export const logoutAll = async (req, res) => {
  try {
    await deleteAllRefreshTokensForUser(req._id);
    res.clearCookie("refreshToken");
    res.json({ message: "Toutes les sessions ont été invalidées" });
  } catch (error) {
    console.log("erreur dans la déconnexion de tous les utilisateur", error);
    res.status(500).json({ error: "Erreur lors de la déconnexion" });
  }
};

export const revokeSession = async (req, res) => {
  const { sessionId } = req.params; // ID de la session à supprimer

  try {
    await RefreshToken.findOneAndUpdate(
      {
        _id: sessionId, // La session spécifique
        userId: req._id, // Sécurité : seulement SES sessions
      },
      { revoked: true } // Marque comme révoquée
    );
    res.sendStatus(204);
    res.json({ message: "La session est révoquée" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getSession = async (req, res) => {
  try {
    const sessions = await RefreshToken.find({
      userId: req._id,
      revoked: false,
      expiresAt: { $gt: new Date() },
    }).select("ipAddress userAgent createdAt");

    res.json(
      sessions.map((session) => ({
        id: session._id,
        ip: session.ipAddress,
        device: session.userAgent,
        lastActive: session.createdAt,
      }))
    );
  } catch (error) {
    console.error("Erreur getSessions:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
