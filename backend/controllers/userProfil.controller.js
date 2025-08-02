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
    const profils = await UserProfil.find()
    .select('identifiantRH nom prenom managerName emploi dateEntree')
    .sort({nom:1})


  res.status(200).json({
      message: "Profils récupérés avec succès",
      count: profils.length,
      profils // ← Structure simple et claire
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
    const profil = await UserProfil.findOne(
      { identifiantRH: req.params.identifiantRH },
      "nom prenom managerName emploi"
    );

    if (!profil) {
      return res.status(404).json({ message: "personne n'a cet identifiant" });
    }
    res.status(200).json({message:"Profil trouvé", profil});

  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération",
      error: error.message,
    });
  }
};

export const updateUserProfil = async(req, res)=>{
   try {
    const { identifiantRH } = req.params;
    const updates = req.body;
    
      // Log des modifications importantes
    const sensitiveFields = ['identifiantRH', 'dateEntree'];
    const modifiedSensitive = sensitiveFields.filter(field => field in updates);
    
    if (modifiedSensitive.length > 0) {
      console.log(`⚠️ AUDIT: Admin ${req.user.identifiant} a modifié les champs sensibles: ${modifiedSensitive.join(', ')} pour le profil ${identifiantRH}`);
    }
    
    const profil = await UserProfil.findOneAndUpdate(
      { identifiantRH },
      updates,
      { new: true, runValidators: true }
    );

    if (!profil) {
      return res.status(404).json({ message: "Profil introuvable" });
    }

    res.status(200).json({
      message: "Profil mis à jour avec succès",
      profil
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour",
      error: error.message
    });
  }
}

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
