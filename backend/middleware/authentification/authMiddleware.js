import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/jwt.js";
import User from "../../models/User/User.js";

export const authenticateToken = async (req, res, next) => {
  try {
    console.log(req.headers, "header");
    // 1. Récupérer le token (privilégier header pour API)
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies.accessToken;

    console.log(token, "token");

    if (!token) {
      return res.status(401).json({ error: "Token manquant" });
    }

    // 2. Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3. Vérifier que l'utilisateur existe toujours ← IMPORTANT !
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      return res.status(401).json({ error: "Utilisateur invalide ou inactif" });
    }

    // 4. Vérifier le scope (si vous l'utilisez)
    if (decoded.scope !== "access") {
      return res
        .status(403)
        .json({ error: "Token non autorisé pour cette action" });
    }

    // 5. Ajouter les infos utilisateur à req
    req.user = {
      id: user._id,
      identifiant: user.identifiant,
      role: user.role,
      rhId: user.rhId,
    };

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token expiré", code: "TOKEN_EXPIRED" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ error: "Token invalide" });
    }

    console.error("Erreur authentification:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
