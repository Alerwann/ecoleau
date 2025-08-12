import PageLayout from "../../../Component/PageLayout/PageLayout";
import Error from "../../../Component/Error";
import RoleModification from "./role/roleModification";
import Action from "./Action";
import { useLocation } from "react-router-dom";

function ModifLayout() {
  const location = useLocation();

  const user = location.state?.userData;
  console.log(user);



  return (
    <PageLayout title="Modification :" subtitle="Rôle de l'utilisateur">
     <Action 
     identifiant = {user.identifiant}
     />
     
    </PageLayout>
  );
}
export default ModifLayout;