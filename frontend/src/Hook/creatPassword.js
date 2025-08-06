export const creatPassword = () => {
  const charmin = "azertyuiopqsdfghjklmwxcvbn";
  const num = "1234567890";
  const charmaj = "AZERTYUIOPQSDFGHJKLMWXCVBN";
  const charSpeciaux = "?./!:;,+*@";

  const globalchar = `${charmin}${num}${charmaj}${charSpeciaux}`;
  console.log(globalchar);

  const nbcharSpeciaux = 2;
  const nbMaj = 2;
  const nbNum = 1;
  const nbMin = 1;

  const longueur = 12;

  const tabGlobal = [];

  const tabPassword = [];

  const longueurRest = longueur - nbMaj - nbcharSpeciaux - nbNum;

  for (let i = 0; i < nbNum; i++) {
    let numberIndex = Math.round(Math.random() * num.length);

    tabGlobal.push(num.charAt(numberIndex));
  }

  for (let i = 0; i < nbMaj; i++) {
    let numberIndex = Math.round(Math.random() * charmaj.length);

    tabGlobal.push(charmaj.charAt(numberIndex));
  }

  for (let i = 0; i < nbcharSpeciaux; i++) {
    let numberIndex = Math.round(Math.random() * charSpeciaux.length);

    tabGlobal.push(charSpeciaux.charAt(numberIndex));
  }

  for (let i = 0; i < nbMin; i++) {
    let numberIndex = Math.round(Math.random() * globalchar.length);
    tabGlobal.push(charmin.charAt(numberIndex))
  }

  for (let i = 0; i < longueurRest; i++) {
    let numberIndex = Math.round(Math.random() * globalchar.length);
    tabGlobal.push(globalchar.charAt(numberIndex));
  }

  for (let i = 0; i < longueur; i++) {
    let numberIndex = Math.round(Math.random() * 8);
    const listechar = tabGlobal.join("");
    tabPassword.push(listechar.charAt(numberIndex));
  }
  return tabPassword.join("");
};
