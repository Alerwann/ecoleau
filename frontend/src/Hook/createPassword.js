export const creatPassword = () => {
  const charMin = "azertyuiopqsdfghjklmwxcvbn";
  const charNum = "1234567890";
  const charMaj = "AZERTYUIOPQSDFGHJKLMWXCVBN";
  const charSpe = "?./!:;,+*";

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