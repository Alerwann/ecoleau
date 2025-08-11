import PageLayout from "../../../Component/PageLayout/PageLayout";
import Toggle from "./Toggle";
import { useLocation } from "react-router-dom";

function Desactivate() {
   const location = useLocation();

  const user = location.state?.userData;
  console.log (user)
 
  return (
    <PageLayout
      title="Écol'eau"
      subtitle="On prend soin de l'environement et pas que..."
    >
      <Toggle isActive={user.isActive} identifiant={user.identifiant}/>
    </PageLayout>
  );
}
export default Desactivate;
