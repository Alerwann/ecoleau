import PageLayout from "../../../../Component/PageLayout/PageLayout";
import RoleModification from "./roleModification";
import { useLocation } from "react-router-dom";

function Modification() {
  const location = useLocation();

  const user = location.state?.userData;
  console.log(user);

  return (
    <PageLayout title="Modification :" subtitle="Rôle de l'utilisateur">
      <RoleModification role={user.role} identifiant={user.identifiant} />
    </PageLayout>
  );
}
export default Modification;