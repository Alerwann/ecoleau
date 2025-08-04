import {
  createUserProfil,
  getAllProfils,
  getUserProfil,
  updateUserProfil,
  getUserProfilByid,
} from "../controllers/userProfil.controller.js";
import express from "express";
import { authenticateToken } from "../middleware/authentification/authMiddleware.js";
import { getProfilsWithoutAccount } from "../controllers/userProfil.controller.js";

import { checkRoles } from "../middleware/checkrole/checkRoles.js";

const router = express.Router();

router.get("/getAll", authenticateToken, checkRoles("rh", "it"), getAllProfils);

router.get("/getone/:identifiantRH", getUserProfil);

router.get("/getonebyid/:id", getUserProfilByid);

router.post("/create", authenticateToken, checkRoles("rh"), createUserProfil);

router.patch("/update/:identifiantRH",authenticateToken, checkRoles("rh", "manager"), updateUserProfil);

router.get('/without-account',  authenticateToken, checkRoles( "it"), getProfilsWithoutAccount);

export default router;
