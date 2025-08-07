import { Routes, Route } from "react-router-dom";

import It from "./ItAccueil";
import CreaCompteUser from "./creaUser/CreaCompteUser";

function ITRoutes() {
  return (
    <Routes>
      <Route index element={<It />} />
      <Route path="/create" element={<CreaCompteUser />} />
    </Routes>
  );
}

export default ITRoutes;
