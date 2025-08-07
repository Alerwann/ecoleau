import { getAllUser } from "../../../services/userServices";

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

  const verif = tabIdentifiants.includes(identTemp);

  return verif;
};

export const creatPassword = () => {
  const charMin = "azertyuiopqsdfghjklmwxcvbn";
  const charNum = "1234567890";
  const charMaj = "AZERTYUIOPQSDFGHJKLMWXCVBN";
  const charSpe = "?./!:;,+*";

  const globalchar = `${charMin}${charNum}${charMaj}${charSpe}`;

  const nbCharSpe = 2;
  const nbMaj = 2;
  const nbNum = 1;
  const nbMin = 1;

  const longueur = 8;

  const tabGlobal = [];
  let tabPassword = "";


  let i = 0;

  let PasswordTemp = [];

  while (tabGlobal.length !== longueur) {
    if (i < nbMaj) {
      let nbMajIndex = Math.round(Math.random() * charMaj.length);

      tabGlobal.push(charMaj.charAt(nbMajIndex));
    }
    if (i < nbMin) {
      let nbMinIndex = Math.round(Math.random() * nbMin.length);
      tabGlobal.push(charMin.charAt(nbMinIndex));
    }
    if (i < nbNum) {
      let nbNumIndex = Math.round(Math.random() * charNum.length);
      tabGlobal.push(charNum.charAt(nbNumIndex));
    }
    if (i < nbCharSpe) {
      let nbCharSpeIndex = Math.round(Math.random() * charSpe.length);
      tabGlobal.push(charSpe.charAt(nbCharSpeIndex));
    }

    let nbAutreIndex = Math.round(Math.random() * globalchar.length);
    tabGlobal.push(globalchar.charAt(nbAutreIndex));
    PasswordTemp = tabGlobal.join("");

    i++;
  }

  while (PasswordTemp.length > 0) {
    let aleatInd = Math.round(Math.random() * (PasswordTemp.length - 1));

    let ajout = PasswordTemp[aleatInd];

    tabPassword = tabPassword.concat("", ajout);

    let essai = PasswordTemp.replace(`${ajout}`, "").trim();
    PasswordTemp = essai;
  }

  return tabPassword;
};
