import { createUser } from "../services/userServices"

function AfficheFormComponent({creaEnd, userId, identifiant, password, role}){



const onClickValidate =async()=>{
  await createUser()
}


  if(!creaEnd){
   return <h1>Choisi un compte pour continuer</h1>
  }
  return  <div>
            {/* <h2>userId: {userId}</h2> */}
            <h2> Identifant : {identifiant}</h2>  
            <h2> Mot de passe : {password}</h2>  
            <h2> Role : {role}</h2>  

            <button > Valider le compte</button>

        </div>

}

export default AfficheFormComponent