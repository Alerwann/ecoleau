//profil des utilisateurs
//ne pourra être modifier que par un admin

import mongoose from "mongoose";

const UserProfilSchema = new mongoose.Schema(
{
    identifiantRH: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    nom: {
      type: String,
      trim: true,
      required: true,
    },
    prenom: {
      type: String,
      trim: true,
      required: true,
    },
    dateNaissance :
    {  type:Date,
      trim:true,
      required: true,
     
    },
    dateEntree: {
      type:Date,
      trim:true,
      required: true,
    },
    managerName: {
      type: String,
      required: false,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
      hasSystemAccess: { // Indicateur pratique
    type: Boolean,
    default: false
  },
    isActive: {
         type: Boolean,
      default: true,
    },
  },

);
UserProfilSchema.index({ managerNom: 1 });

export default mongoose.model("UserProfil", UserProfilSchema);
