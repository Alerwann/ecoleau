import { useEffect, useState } from "react";

import { useUsers } from "../../contexts/UsersContext";
import { getAllUser } from "../../services/userServices";



function CreatForm({nom, prenom}) {


  const [identifiant, setIdentifiant]= useState()
  const [userList, setuserList]=useState()



const usersList =async ()=>{
 
    try {
      const data = await getAllUser();
    
      setuserList(data.identifiants)
 
    
    } catch (err) {
     
    } finally {
     
    }
}



const creatIdentifiant = (nom,prenom, )=>{

  const firstNom = `${nom}`.charAt(0).toUpperCase()
  const firstPrenom = `${prenom}`.charAt(0).toLocaleUpperCase()
  const code =Math.round( Math.random()*(999999-100000)+100000)
  setIdentifiant(`${firstNom}${firstPrenom}${code}`)

 usersList()

 console.log(userList)


 



}
















  return(
    <div>
      <h1>hello {nom} {prenom}</h1>
      <button onClick={()=>creatIdentifiant(nom,prenom)}> creer identifiant</button>
      <h2>{identifiant? `${identifiant}`:'n\'est pas identifier'}</h2>
      

    </div>
  )

}

export default CreatForm;
