import userAuthentification from "../models/refreshToken.js";

// Ajoute un userAuthentification en base
export const createuserAuthentification = async (userId, token, req) => {
  try {
    await userAuthentification.create({
      token,
      userId,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent"),
    });
  } catch (error) {
    console.error("Erreur création refresh token:", error);
    throw new Error("Impossible de créer le refresh token");
  }
};

// Vérifie si un userAuthentification est valide
export const verifyuserAuthentification = async (token) => {
  const storedToken = await userAuthentification.findOne({ token });
  return !!storedToken; // Retourne true si trouvé, false sinon
};

// Supprime un userAuthentification (pour le logout)
export const deleteuserAuthentification = async (token) => {
  await userAuthentification.deleteOne({ token });
};
// Supprime tous les userAuthentifications d'un utilisateur
export const deleteAlluserAuthentificationsForUser = async (userId) => {
  await userAuthentification.deleteMany({ userId });
};
