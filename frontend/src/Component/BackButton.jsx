import { useNavigate } from "react-router-dom";

function BackButton(chemin) {
    console.log(chemin)
  const navigate = useNavigate();


  const onClickBack =()=>{
    navigate(`${chemin.chemin}`)
  }

  if (chemin !== "/") {
    return <button onClick={onClickBack} > Retour précédent</button>;
  } else {return <button onClick={onClickBack}>Retour Accueil</button>;
  }
}
export default BackButton;
