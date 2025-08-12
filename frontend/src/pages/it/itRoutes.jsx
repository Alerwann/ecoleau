import { Routes, Route } from "react-router-dom";

import It from "./ItAccueil";
import CreaCompteUser from "./creaUser/CreaCompteUser";

import ModificationUser from "./listAction/ModificationUser";

function ITRoutes() {
  return (
    <Routes>
      <Route index element={<It />} />
      <Route path="/create" element={<CreaCompteUser />} />
   
      <Route path="/modification" element={<ModificationUser/>}/>
    </Routes>
  );
}

export default ITRoutes;
