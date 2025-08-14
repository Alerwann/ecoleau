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
    } catch (error) {
       console.error("Erreur vérification:", error);
      break; // Éviter boucle infinie
    }

    console.log(verif);
  }

  return identTemp;
};

export const verifIdentifiant = async (identTemp) => {

  try {
    const users = await getAllUser();
    return users.some(user => user.identifiant === identTemp);
  } catch (error) {
    console.log(error, "impossible d'avoir la liste");
    throw error;
  }

};

export const creatPassword = () => {
  const charMin = "azertyuiopqsdfghjklmwxcvbn";
  const charNum = "1234567890";
  const charMaj = "AZERTYUIOPQSDFGHJKLMWXCVBN";
  const charSpe = "?.@!:;,&+*";

  const globalchar = `${charMin}${charNum}${charMaj}${charSpe}`;

  const nbCharSpe = 1;
  const nbMaj = 1;
  const nbNum = 1;
  const nbMin = 1;

  const longueur = 8;



let tabGlobal = [];

  // D'abord, ajouter le nombre exact de chaque type
  for (let j = 0; j < nbMaj; j++) {
    let index = Math.floor(Math.random() * charMaj.length);
    tabGlobal.push(charMaj.charAt(index));
  }

  for (let j = 0; j < nbMin; j++) {
    let index = Math.floor(Math.random() * charMin.length);
    tabGlobal.push(charMin.charAt(index));
  }

  for (let j = 0; j < nbNum; j++) {
    let index = Math.floor(Math.random() * charNum.length);
    tabGlobal.push(charNum.charAt(index));
  }

  for (let j = 0; j < nbCharSpe; j++) {
    let index = Math.floor(Math.random() * charSpe.length);
    tabGlobal.push(charSpe.charAt(index));
  }

  // Ensuite, compléter avec des caractères aléatoires
  while (tabGlobal.length < longueur) {
    let index = Math.floor(Math.random() * globalchar.length);
    tabGlobal.push(globalchar.charAt(index));
  }

  // Mélanger le tableau pour éviter un ordre prévisible
  for (let i = tabGlobal.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tabGlobal[i], tabGlobal[j]] = [tabGlobal[j], tabGlobal[i]];
  }
console.log(tabGlobal)
  return tabGlobal.join("");
};