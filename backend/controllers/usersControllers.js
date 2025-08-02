import User from "../models/User/User.js";


export const createUser = async (req, res) => {
  try {
    const { userId, password, identifiant , role} = req.body;

    if (!userId || !password || !identifiant || !role) {
      return res.status(400).json({ message: "tous les champs sont requis" });
    }
    const newUser = new User({
      identifiant,
      password,
      userId,
      role,
    });
    const savedUser = await newUser.save();
    // Puis vous pouvez directement modifier l'objet

    const userResponse = {
     userId : savedUser.userId,
      identifiant: savedUser.identifiant,
      role: savedUser.role,
      identifiant: savedUser.identifiant,

      __v: savedUser.__v
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




export const users = async (req, res) => {
  try {
    const users = await User.find({}, "identifiant nom prenom");

    res.status(200).json({
      count: users.length,
      identifiants: users.map((user) => user.identifiant),
      nom: users.map((user) => user.nom),
      prenom: users.map((user) => user.prenom),
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
    const result = await User.findOne({ identifiant: req.params.identifiant },
      "identifiant"
    );

    if (!result) {
      return res.status(404).json({ message: "personne n'a cet identifiant" });
    }
    res.status(200).json({
      identifiant: req.params.identifiant,
      nom: result.nom,
      prenom:  result.prenom,
    });
  } catch (error) {
    res.status(500).json({
 
      message: "Erreur lors de la récupération",
      error: error.message,
    });
  }
};
