import PageLayout from "../../../../Component/PageLayout/PageLayout";
import Toggle from "./Toggle";
import { useLocation } from "react-router-dom";

function Desactivate() {
  const location = useLocation();

  const user = location.state?.userData;
  console.log(user);

  return (
    <PageLayout title="Modification :" subtitle="État de session">
      <Toggle isActive={user.isActive} identifiant={user.identifiant} />
    </PageLayout>
  );
}
export default Desactivate;
