import { Routes, Route } from "react-router-dom";

import It from "./ItAccueil";
import CreaCompteUser from "./creaUser/CreaCompteUser";
import Desactivate from "./listAction/Desactivate";

function ITRoutes() {
  return (
    <Routes>
      <Route index element={<It />} />
      <Route path="/create" element={<CreaCompteUser />} />
      <Route path="/desactivation" element={<Desactivate/>} />
    </Routes>
  );
}

export default ITRoutes;
