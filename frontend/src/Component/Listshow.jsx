import { useNavigate } from "react-router-dom";

function ListShow({ listUsers }) {
  const navigate = useNavigate();
  
  if (!listUsers) {
    return <div>Aucune donnée disponible</div>;
  }

  // Vérifier si c'est l'objet du backend ou un tableau transformé
  let usersToDisplay = [];
  
  if (Array.isArray(listUsers)) {
    // Si c'est déjà un tableau (de ItAccueil après transformation)
    usersToDisplay = listUsers;
  } else if (listUsers.identifiants) {
    // Si c'est l'objet brut du backend, transformer ici
    usersToDisplay = listUsers.identifiants.map((identifiant, index) => ({
      identifiant: identifiant,
      userId: listUsers.userId[index],
      role: listUsers.role[index],
      isActive: listUsers.isActive[index] ? "oui" : "non"
    }));
  }


const modification =(user)=>{
  navigate('/it/modification', {state: {userData: user}})
}

  return (
    <div>
      <p>Nombre d'utilisateurs : {usersToDisplay.length}</p>
      {usersToDisplay.map((user, index) => (
        <div key={user.identifiant || index} className="card user">
          <div>
            <h3>Identifiant : {user.identifiant}</h3>
            <h3>Role : {user.role}</h3>
            <h3>Id d'utilisateur : {user.userId}</h3>
          </div>
          <div>
            <h3>Actif : {user.isActive}</h3>
          </div>
          <button 
            onClick={() => modification({
              isActive: user.isActive, 
              identifiant: user.identifiant,
              action:'role'
            })}
          >
           Modifier l'accès
          </button>
          <button
          onClick={()=>modification({
            identifiant: user.identifiant,
            role: user.role,
            action: 'acces'
          })}
          >Modifier le role</button>
        </div>
      ))}
    </div>
  );
}export default ListShow