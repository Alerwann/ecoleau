import { useEffect } from "react"
import { createUser } from "../services/userServices"

function AfficheFormComponent({creaEnd, userId, identifiant, password, role}){

    useEffect(()=>{
        
    })


const onClickValidate =async()=>{

    try{await createUser({userId,password,identifiant,role})
        console.log('enregister')}
    catch(error){
        console.log('erreur lors de la création', error)
    }
  
}



  if(!creaEnd){
   return <h1>Choisi un compte pour continuer</h1>
  }
  return  <div>
          
            <h2> Identifant : {identifiant}</h2>  
            <h2> Mot de passe : {password}</h2>  
            <h2> Role : {role}</h2>  

            <button onClick={()=>onClickValidate(userId, password, identifiant, role)}> Valider le compte</button>

        </div>

}

export default AfficheFormComponent