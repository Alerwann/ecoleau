import PageLayout from "../../../Component/PageLayout/PageLayout";
import Toggle from "./access/Toggle";
import Error from "../../../Component/Error";
import RoleModification from "./role/roleModification";
import Action from "./Action";
import { useLocation } from "react-router-dom";

function ModifLayout() {
  const location = useLocation();

  const user = location.state?.userData;
  console.log(user);
function ModifChoice(){
switch(user.action){
  case 'role': return(<Action />);  case 'acces' : return(<RoleModification/>);  default : return(<Error/>);}

}


  return (
    <PageLayout title="Modification :" subtitle="Rôle de l'utilisateur">
     <ModifChoice/>
     
    </PageLayout>
  );
}
export default ModifLayout;