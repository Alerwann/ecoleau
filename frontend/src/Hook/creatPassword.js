export const creatPassword = () => {
  const charMin = "azertyuiopqsdfghjklmwxcvbn";
  const charNum = "1234567890";
  const charMaj = "AZERTYUIOPQSDFGHJKLMWXCVBN";
  const charSpe = "?./!:;,+*";

  const globalchar = `${charMin}${charNum}${charMaj}${charSpe}`;
  console.log(globalchar);

  const nbCharSpe = 2;
  const nbMaj = 2;
  const nbNum = 1;
  const nbMin = 1;

  const longueur = 8;

  const tabGlobal = [];
  let tabPassword=""

  // let j=0;

  let i = 0;

  let PasswordTemp = [];

  while (tabGlobal.length !== longueur) {
    console.log("début de la création du mot de passe");

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
console.log(PasswordTemp, 'avant while')

while(PasswordTemp.length>0){

  console.log ('debut longuer:',PasswordTemp.length)
  let aleatInd = Math.round(Math.random()*(PasswordTemp.length-1))

  console.log(PasswordTemp[aleatInd],'case ajouté')

  let ajout = PasswordTemp[aleatInd]

  console.log(ajout, 'ajout')

  tabPassword=tabPassword.concat("",ajout)
  console.log(tabPassword, 'evolution du mot de pass')

let essai = PasswordTemp.replace(`${ajout}`,"").trim()
PasswordTemp=essai;




console.log(aleatInd,essai, 'essai')

}

return tabPassword


};
