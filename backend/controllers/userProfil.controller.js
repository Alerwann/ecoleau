import UserProfil from "../models/User/UserProfil.js";

// create

export const createUserProfil = async (req, res) => {
  try {
    const { identifiantRH, nom, prenom, dateEntree, managerName, emploi } =
      req.body;

    if (
      !identifiantRH ||
      !nom ||
      !prenom ||
      !dateEntree ||
      
      !emploi
    ) {
      return res.status(400).json({ message: "tous les champs sont requis" });
    }
    const newUserProfil = new UserProfil({
      identifiantRH,
      nom,
      prenom,
      dateEntree,
      managerName,
      emploi,
    });
    const savedUserProfil = await newUserProfil.save();

    const newuserProfil = {
      _id: savedUserProfil._id,
      identifiantRH: savedUserProfil.identifiantRH,
      nom: savedUserProfil.nom,
      prenom: savedUserProfil.prenom,
      dateentree: savedUserProfil.dateEntree,
      managerName: savedUserProfil.managerName,
      emploi: savedUserProfil.emploi,
      __v: savedUserProfil.__v,
    };

    res.status(201).json({
      message: "Profil créé avec succès",
      user: newuserProfil,
    });
  } catch (error) {
    console.error("Erreur lors de la création:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Un profil avec cet identifiant existe déjà",
      });
    }

    // Erreur serveur générique
    return res.status(500).json({
      message: "Erreur lors de la création de l'utilisateur",
      error: error.message,
    });
  }
};

export const getAllProfils = async (req, res) => {
  try {
    const profil = await UserProfil.find(
      {},
      "identifiant nom prenom managerName emploi"
    );

    res.status(200).json({
      count: profil.length,
      identifiantRH: profil.map((UserProfil) => UserProfil.identifiantRH),
      nom: profil.map((UserProfil) => UserProfil.nom),
      prenom: profil.map((UserProfil) => UserProfil.prenom),
      managerName: profil.map((UserProfil) => UserProfil.managerName),
      emploi: profil.map((UserProfil) => UserProfil.emploi),
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération",
      error: error.message,
    });
  }
};

export const getUserProfil = async (req, res) => {
  try {
    const result = await UserProfil.findOne(
      { identifiantRH: req.params.identifiantRH },
      "nom prenom managerName emploi"
    );

    if (!result) {
      return res.status(404).json({ message: "personne n'a cet identifiant" });
    }
    res.status(200).json({
      identifiantRH: req.params.identifiantRH,
      nom: profil.map((UserProfil) => UserProfil.nom),
      prenom: profil.map((UserProfil) => UserProfil.prenom),
      managerName: profil.map((UserProfil) => UserProfil.managerName),
      emploi: profil.map((UserProfil) => UserProfil.emploi),
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération",
      error: error.message,
    });
  }
};

// delete

//  export const deleteUserProfil = async(req,res)=>{

//   try {
//     const result = await UserProfil.deleteOne({
//       identifiantRH: req.params.identifiantRH,
//     });

//     if (result.deletedCount === 0) {
//       return res
//         .status(404)
//         .json({ message: "Aucun utilisateur trouvé avec cet identifiant" });
//     }

//     res.status(200).json({
//       message: "Utilisateur supprimé avec succès",
//       identifiant: req.params.identifiant,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Erreur lors de la suppression",
//       error: error.message,
//     });
//   }
// };
