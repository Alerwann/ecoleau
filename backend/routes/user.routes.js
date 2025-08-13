import express from "express";
import {
  createUser,
  deleteUser,
  user,
  resetUserPassword,
  changeOwnPassword,
  changeUserRole,
  toggleUserActive,
  userList
} from "../controllers/usersControllers.js";
import { checkRoles } from "../middleware/checkrole/checkRoles.js";

import { authenticateToken } from "../middleware/authentification/authMiddleware.js";


const router = express.Router();

router.post("/createuser", authenticateToken, checkRoles("it"), createUser);

router.get("/userlist", userList);

router.get("/getone/:identifiant",  user);

router.post("/reset-password/:identifiant", authenticateToken, checkRoles("it"), resetUserPassword);
router.patch("/change-role/:identifiant", authenticateToken, checkRoles("it"), changeUserRole);
router.patch("/toggle-active/:identifiant", authenticateToken, checkRoles("it"), toggleUserActive);

// Pour l'utilisateur lui-même
router.patch("/change-password", authenticateToken, changeOwnPassword);

router.delete("/users/:identifiant", authenticateToken, checkRoles("it"), deleteUser);

router.put('/change-password', authenticateToken, changeOwnPassword);



export default router;
