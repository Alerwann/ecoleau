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

  const longueur = 8;

  const tabGlobal = [];

  const tabPassword = [];

  const longueurRest = longueur - nbMaj - nbcharSpeciaux - nbNum-nbMin;

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
    console.log(tabGlobal,'avant dernier ')
    let numberIndex = Math.round(Math.random() * globalchar.length);
    while(tabGlobal.includes(globalchar.charAt(numberIndex))){
      console.log('entrer dans while')
      numberIndex=Math.round(Math.random() * globalchar.length)
    }
    console.log('while fini')
    tabGlobal.push(globalchar.charAt(numberIndex));
  }
   const listechar = tabGlobal.join("");
    console.log(listechar,'liste global')

  for (let i = 0; i < longueur; i++) {
    console.log(tabGlobal,'dernier for init')
    let numberIndex = Math.round(Math.random() * 8);
   

    tabPassword.push(listechar.charAt(numberIndex));

    console.log(tabPassword, 'fin du prog')
  }
  return tabPassword.join("");
};
