
import {useUsers} from "../contexts/UsersContext"

function AfficheFormComponent({creaEnd, userId, identifiant, password, role}){

    const {createNewUser} =useUsers()


const onClickValidate =async()=>{

    try{await createNewUser({userId,password,identifiant,role})
        console.log('enregister')}
    catch(error){
        console.log('erreur lors de la création', error)
    }
//   window.location.reload()
}



  if(creaEnd){
  
  return  <div>
          
            <h2> Identifant : {identifiant}</h2>  
            <h2> Mot de passe : {password}</h2>  
            <h2> Role : {role}</h2>  

            <button onClick={()=>onClickValidate(userId, password, identifiant, role)}> Valider le compte</button>

        </div>

}}

export default AfficheFormComponent