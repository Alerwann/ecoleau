import { Routes, Route } from "react-router-dom";

import It from "./ItAccueil";
import CreaCompteUser from "./creaUser/CreaCompteUser";
import Toggle from "./listAction/Toggle";

function ITRoutes() {
  return (
    <Routes>
      <Route index element={<It />} />
      <Route path="/create" element={<CreaCompteUser />} />
      <Route path="/toggle" element={<Toggle/>} />
    </Routes>
  );
}

export default ITRoutes;
