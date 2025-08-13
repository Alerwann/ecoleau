import PageLayout from "../../../Component/PageLayout/PageLayout";
import Action from "./Action";
import { useLocation } from "react-router-dom";
import { getSubtitle } from "../../../fonctionUtilitaire/getSubtitle";

function ModificationUser() {
  const location = useLocation();

  const user = location.state?.userData;
  console.log(user);

  return (
    <PageLayout
      title="Modification :"
      subtitle={getSubtitle(user.action)}
      service="Service technique"
    >
      <Action
        identifiant={user.identifiant}
        action={user.action}
        role={user.role}
        isActive={user.isActive}
      />
    </PageLayout>
  );
}
export default ModificationUser;
