import express from "express";
import {
  login,
  logout,
  logoutAll,
  getSession,
  revokeSession,
  refreshToken,
} from "../controllers/auth.controllers.js";

import { checkRoles } from "../middleware/checkrole/checkRoles.js";
import { checkOwnerOrManagement } from "../middleware/checkrole/checkOwnerOrManagement.js";

import { loginLimiter } from "../middleware/authentification/rate-limiter.js";
import { authenticateToken } from "../middleware/authentification/authMiddleware.js";
const router = express.Router();

router.post("/login", loginLimiter, login);
router.post("/refresh-token", refreshToken);

router.post("/logout", authenticateToken, logout);
router.post("/logoutall", authenticateToken, checkRoles("it"), logoutAll);
router.get("/getSession", authenticateToken, checkOwnerOrManagement, getSession);
router.post(  "/revokesession", authenticateToken, checkRoles("it"), revokeSession);

export default router;



