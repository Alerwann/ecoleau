export const useVerificationPassword = (setFeedback) => {
  
  const validPassword = (newPassword, verifPassword, currentPassord) => {
    // 🎯 IMPORTANT : Vider le feedback à chaque validation
    const newFeedback = [];
    
    // Vérification des champs vides
   if (!newPassword.trim() || !verifPassword.trim() || !currentPassord) {
      newFeedback.push("❌ Tous les champs sont requis");
    } else {
      newFeedback.push("✅ Tous les champs sont remplis");
    }
    
    // Vérification concordance
      if (newPassword.trim() && verifPassword.trim()) {
      if (newPassword !== verifPassword) {
        newFeedback.push("❌ Les mots de passe doivent être identiques");
      } else {
        newFeedback.push("✅ Les mots de passe sont identiques");
      }
    }else{newFeedback.push("❌ Les mots de passe doivent être identiques")}
    
    // Vérifications de complexité (seulement si les champs sont remplis)
    if (newPassword.length >= 8) {
      newFeedback.push("✅ Longueur suffisante");
    } else {
      newFeedback.push("❌ Trop court (min 8 caractères)");
    }
    
    if (/[a-z]/.test(newPassword)) {
      newFeedback.push("✅ Contient des minuscules");
    } else {
      newFeedback.push("❌ Manque des minuscules");
    }
    
    if (/[A-Z]/.test(newPassword)) {
      newFeedback.push("✅ Contient des majuscules");
    } else {
      newFeedback.push("❌ Manque des majuscules");
    }
    
    if (/\d/.test(newPassword)) {
      newFeedback.push("✅ Contient des chiffres");
    } else {
      newFeedback.push("❌ Manque des chiffres");
    }
    
    if (/[?.@!:;,+*&]/.test(newPassword)) {
      newFeedback.push("✅ Contient des caractères spéciaux");
    } else {
      newFeedback.push("❌ Manque des caractères spéciaux (@$!%*?&)");
    }
    
    // 🎯 Mettre à jour le feedback UNE SEULE FOIS
    setFeedback(newFeedback);
    
    // Retourner si le mot de passe est valide
    const isValid = newPassword.trim() && 
                   verifPassword.trim() &&
                   newPassword === verifPassword && 
                   newPassword.length >= 8 && 
                   /[a-z]/.test(newPassword) && 
                   /[A-Z]/.test(newPassword) && 
                   /\d/.test(newPassword) && 
                   /[?.@!:;,+*&]/.test(newPassword)
  return isValid
                  }
  
  return { validPassword };
};