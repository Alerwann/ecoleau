import { Routes, Route } from "react-router-dom";

import It from "./ItAccueil";
import CreaCompteUser from "./creaUser/CreaCompteUser";
import Desactivate from "./listAction/access/Desactivate";
import Modification from "./listAction/role/Modification";

function ITRoutes() {
  return (
    <Routes>
      <Route index element={<It />} />
      <Route path="/create" element={<CreaCompteUser />} />
      <Route path="/accessmodification" element={<Desactivate />} />
      <Route path="/rolemodification" element={<Modification/>}/>
    </Routes>
  );
}

export default ITRoutes;
