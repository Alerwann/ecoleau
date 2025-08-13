import User from "../models/User/User.js";

export const createUser = async (req, res) => {
  console.log('debut back createUsser')
  try {
  
    const { rhId, password, identifiant, role } = req.body;

    if (!rhId || !password || !identifiant || !role) {
      return res.status(400).json({ message: "tous les champs sont requis" });
    }
    const newUser = new User({
      identifiant,
      password,
      rhId,
      role,
    });
    const savedUser = await newUser.save();
    // Puis vous pouvez directement modifier l'objet

    const userResponse = {
      rhId: savedUser.rhId,
      identifiant: savedUser.identifiant,
      role: savedUser.role,
      identifiant: savedUser.identifiant,

      __v: savedUser.__v,
    };

    res.status(201).json({
      message: "utilisateur créé avec succès",
      user: userResponse,
    });
  } catch (error) {
    console.error("Erreur lors de la création:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Un utilisateur avec cet identifiant existe déjà",
      });
    }

    // Erreur serveur générique
    return res.status(500).json({
      message: "Erreur lors de la création de l'utilisateur",
      error: error.message,
    });
  }
};
export const userList = async (req, res) => {
  try {
    const users = await User.find()
      .select("identifiant rhId role isActive")
      .sort({ identifiant: 1 });
    console.log(users, "users");

    res.status(200).json({
      message: "récupéré avec succes",
      count: users.length,
      identifiants: users.map((user) => user.identifiant),
      rhId: users.map((user) => user.rhId),
      role: users.map((user) => user.role),
      isActive: users.map((user) => user.isActive),
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({
      identifiant: req.params.identifiant,
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Aucun utilisateur trouvé avec cet identifiant" });
    }

    res.status(200).json({
      message: "Utilisateur supprimé avec succès",
      identifiant: req.params.identifiant,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression",
      error: error.message,
    });
  }
};

export const user = async (req, res) => {
  try {
    const result = await User.findOne(
      { identifiant: req.params.identifiant },
      "identifiant"
    );

    // const result = await User.findById(req.params._id)

    if (!result) {
      return res.status(404).json({ message: "personne n'a cet identifiant" });
    }

    res.status(200).json({
      rhId: req.params.rhId,
      identifiant: result.identifiant,
      role: result.role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération",
      error: error.message,
    });
  }
};

export const resetUserPassword = async (req, res) => {
  try {
    const { identifiant } = req.params;

    // Générer un mot de passe temporaire
    const tempPassword = `Temp${Math.random().toString(36).slice(-8)}!`;
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const updatedUser = await User.findOneAndUpdate(
      { identifiant },
      {
        password: hashedPassword,
        mustChangePassword: true, // ← Flag pour forcer le changement
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    // Log pour audit
    console.log(`🔄 Réinitialisation mot de passe par IT:`);
    console.log(`👤 Utilisateur: ${identifiant}`);
    console.log(`👮 Par: ${req.user.identifiant}`);
    console.log(`⏰ Date: ${new Date().toISOString()}`);

    res.json({
      message: "Mot de passe réinitialisé",
      temporaryPassword: tempPassword,
      instructions:
        "L'utilisateur doit changer ce mot de passe à la première connexion",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const changeUserRole = async (req, res) => {
  const { identifiant } = req.params;
  const { newRole, motif } = req.body; // ← Obligation de justifier

  if (!motif) {
    return res
      .status(400)
      .json({ error: "Raison obligatoire pour changement de rôle" });
  }

  const validRoles = ["it", "rh", "manager", "conseiller"];
  if (!validRoles.includes(newRole)) {
    return res.status(400).json({ error: "Rôle invalide" });
  }

  // Log auditoire
  console.log(`🔄 CHANGEMENT DE RÔLE:`);
  console.log(`👤 Utilisateur: ${identifiant}`);
  console.log(`🎭 Nouveau rôle: ${newRole}`);
  console.log(`📝 Raison: ${motif}`);
  console.log(`👮 Par: ${req.user.identifiant}`);
  console.log(`⏰ Date: ${new Date().toISOString()}`);

  const updatedUser = await User.findOneAndUpdate(
    { identifiant },
    { role: newRole },
    { new: true }
  );

  res.json({
    message: "Rôle modifié avec succès",
    user: updatedUser,
    auditLog: `Rôle changé vers ${newRole} - Raison: ${motif}`,
  });
};

export const changeOwnPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const rhIdentifiant = req.user.identifiant; // Depuis le token JWT

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: "Mot de passe actuel et nouveau requis",
      });
    }

    // Récupérer l'utilisateur
    const user = await User.findOne({ identifiant: rhIdentifiant });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    // Vérifier l'ancien mot de passe
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isValidPassword) {
      return res.status(400).json({ error: "Mot de passe actuel incorrect" });
    }

    // Validation du nouveau mot de passe
    if (newPassword.length < 8) {
      return res.status(400).json({
        error: "Le nouveau mot de passe doit contenir au moins 8 caractères",
      });
    }

    // Hash et mise à jour
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate(
      { identifiant: rhIdentifiant },
      {
        password: hashedNewPassword,
        mustChangePassword: false, // Supprime le flag de changement obligatoire
        lastPasswordChange: new Date(),
      }
    );

    // Log pour audit
    console.log(`🔑 Changement mot de passe:`);
    console.log(`👤 Utilisateur: ${rhIdentifiant}`);
    console.log(`⏰ Date: ${new Date().toISOString()}`);

    res.json({
      message: "Mot de passe modifié avec succès",
      mustChangePassword: false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const toggleUserActive = async (req, res) => {
  try {
    const { identifiant } = req.params;
    const { reason } = req.body; // Raison optionnelle

    const user = await User.findOne({ identifiant });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    const newStatus = !user.isActive;

    const action = newStatus ? "activé" : "désactivé";

    // Mise à jour
    const updatedUser = await User.findOneAndUpdate(
      { identifiant },
      {
        isActive: newStatus,
        lastStatusChange: new Date(),
      },
      { new: true }
    );

    // Log pour audit
    console.log(`🔄 Compte ${action}:`);
    console.log(`👤 Utilisateur: ${identifiant}`);
    console.log(`👮 Par: ${req.user.identifiant}`);
    console.log(`📝 Raison: ${reason || "Non spécifiée"}`);
    console.log(`⏰ Date: ${new Date().toISOString()}`);

    res.json({
      message: `Compte ${action} avec succès`,
      user: {
        identifiant: updatedUser.identifiant,
        isActive: updatedUser.isActive,
        role: updatedUser.role,
      },
      action,
      reason: reason || null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
