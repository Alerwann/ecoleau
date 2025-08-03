import express from "express";
import {
  createUser,
  users,
  deleteUser,
  user,
  resetUserPassword,
  changeOwnPassword,
  changeUserRole,
  toggleUserActive
} from "../controllers/usersControllers.js";
import { checkRoles } from "../middleware/checkrole/checkRoles.js";

import { authenticateToken } from "../middleware/authentification/authMiddleware.js";

const router = express.Router();

router.post("/createuser",authenticateToken, checkRoles("it"), createUser);

router.get("/users", authenticateToken, checkRoles("it"), users);

router.get("/getone/:identifiant", authenticateToken, checkRoles("it"), user);

router.post("/reset-password/:identifiant", authenticateToken, checkRoles("it"), resetUserPassword);
router.patch("/change-role/:identifiant", authenticateToken, checkRoles("it"), changeUserRole);
router.patch("/toggle-active/:identifiant", authenticateToken, checkRoles("it"), toggleUserActive);

// Pour l'utilisateur lui-même
router.patch("/change-password", authenticateToken, changeOwnPassword);

router.delete("/users/:identifiant", authenticateToken, checkRoles("it"), deleteUser);

export default router;
