import { getAllUser } from "../services/userServices";

export const creatIdentifiant = async (nom, prenom) => {
  const firstNom = `${nom}`.charAt(0).toUpperCase();
  const firstPrenom = `${prenom}`.charAt(0).toLocaleUpperCase();
  const code = Math.round(Math.random() * (999999 - 100000) + 100000);
  let verif = true;
  let identTemp = `${firstNom}${firstPrenom}${code}`;
  while (verif === true) {
    try {
      verif = await verifIdentifiant(identTemp);
    } catch (error) {}

    console.log(verif);
  }

  return identTemp;
};



export const verifIdentifiant = async (identTemp) => {
  let profilsuser = [];
  let tabIdentifiants = [];
  try {
    profilsuser = await getAllUser();
  } catch (error) {
    console.log(error, "impossible d'avoir la liste");
  }
  tabIdentifiants = profilsuser.identifiants;
  console.log(tabIdentifiants, identTemp, "hook");

  const verif = tabIdentifiants.includes(identTemp);
  console.log(verif, "verif");

  return verif;
};


// export const verifIdentifiant = async (nom,prenom)=>{
//   let profilsuser = [];
//   let tabIdentifiants = [];
//   let identTemp= creatIdentifiant(nom,prenom)
//   console.log(identTemp)

//   try {
//     profilsuser = await getAllUser();
//   } catch (error) {
//     console.log(error, "impossible d'avoir la liste");
//   }
//   tabIdentifiants = profilsuser.identifiants;
//   console.log(tabIdentifiants,identTemp, "hook");

//   const verif = tabIdentifiants.includes(identTemp)
//   console.log(verif, 'verif')
//   while(verif===true){

//   }
// }