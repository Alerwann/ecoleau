
import { useNavigate } from "react-router-dom";


function ListUserShow(listUsers) {
  const navigate=useNavigate()

  let Actif = "";
  let tabUsers = [];
  const listUser = listUsers.listUsers[0];

  console.log(listUser, "entree component", listUser.count);

  for (let i = 0; i < listUser.count; i++) {
    console.log(
      listUser.identifiants[i],
      listUser.role[i],
      listUser.isActive[i]
    );
    if (listUser.isActive) {
      Actif = "oui";
    } else {
      Actif = "non";
    }

    let User = {
      identifiant: `${listUser.identifiants[i]}`,
      role: `${listUser.role[i]}`,
      isActive: Actif,
      userId: `${listUser.userId[i]}`,
    };
    tabUsers.push(User);
  }
  const toggled = (user) => {
   navigate('/it/toggle',{state: { userData: user}})
  };

  return (
    <div>
      {tabUsers.map((user) => (
        <div key={user.identifiant} className="card user ">
          <div>
            <h3>Identifiant : {user.identifiant}</h3>

            <h3>Role : {user.role} </h3>
            <h3>Id d'utilisateur : {user.userId} </h3>
          </div>
          <div>
            <h3>Actif : {user.isActive}</h3>
          </div>

          <button onClick={() => toggled({isActive:user.isActive, identifiant:user.identifiant,  })}>Suspendre l'accès</button>
          <button>Mofifier la personne</button>
        </div>
      ))}
    </div>
  );
}

export default ListUserShow;
