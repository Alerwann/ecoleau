import { Routes, Route } from "react-router-dom";

import It from "./ItAccueil";
import CreaCompteUser from "./creaUser/CreaCompteUser";

import ModifLayout from "./listAction/ModificationLayout";

function ITRoutes() {
  return (
    <Routes>
      <Route index element={<It />} />
      <Route path="/create" element={<CreaCompteUser />} />
   
      <Route path="/modification" element={<ModifLayout/>}/>
    </Routes>
  );
}

export default ITRoutes;
