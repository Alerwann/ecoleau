import {  useState } from "react";

import Loading from "../../Component/Loading";

import { creatPassword } from "../../Hook/creatPassword";
import { creatIdentifiant } from "../../Hook/creatIdentifiant";
import BilanForm from "../../Component/EnregistrementForm";

function CreatForm({ id, nom, prenom,role, choice }) {

  const [loading, setLoading] = useState(false);
  const [identifiantReq, setIdentifiantReq] = useState();

  const [passwordfinal, setPassordfinal] = useState();

  const [userId, setUserId] =useState();
  const [userRole, setUserRole]=useState()

  const [creaEnd, setCreaEnd]= useState(false)


  if (loading) {
    return <Loading />;
  }

  
  const Form =({creaEnd})=>{
    if(creaEnd){
      return <div>
          <h1>
        hello {nom} {prenom} <br />
        id :{id}
      </h1>
      <h1>formulaire </h1>
      </div>
      
    }return <h1>attente de creation</h1>
  }

  const handleClickMdp = async () => {
    let identifant
 
    setLoading(true)
 

    setUserId(id)
    setUserRole(role)

    console.log(role, 'role handleclick')
    const password = creatPassword();
    setPassordfinal(password);

    try{identifant=await creatIdentifiant(nom,prenom)}

    catch(error){console.log('erruer handle clicj')}


    console.log(identifant, 'fin des hooks')
    
    
    setIdentifiantReq(identifant)
    setCreaEnd(true)
    setLoading(false)

  };
  console.log(passwordfinal,identifiantReq, "password et identifiant");


  return (
    <div>
      <button onClick={() => handleClickMdp()}> Créer l'utilisateur : {nom } {prenom}</button>

    
    <Form/>
    </div>
  );
}

export default CreatForm;
