export const getSubtitle = (action) => {
  const subtitles = {
    role: "Rôle de l'utilisateur",
    acces: "Accès de l'utilisateur",
    password: "Mot de passe de l'utilisateur",
    gestion: "Accueil",
    creationUser: "Liste des comptes en attente",
  };
  return subtitles[action] || "Modification utilisateur";
};
