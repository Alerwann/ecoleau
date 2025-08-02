import express from "express";
import {
  login,
   logout,
  logoutAll,
  getSession,
  revokeSession,
  refreshToken,
} from "../controllers/auth.controllers.js";

import { checkRoles } from '../middleware/checkrole/checkRoles.js';
import { checkOwnerOrAdmin } from '../middleware/checkrole/checkOwnerOrAdmin.js';


import { loginLimiter } from "../middleware/authentification/rate-limiter.js";
import { authenticateToken } from "../middleware/authentification/authMiddleware.js";
const router = express.Router();

router.post("/login", loginLimiter, login);
router.post("/refresh-token", checkRoles('admin', 'manager','conseiller'), refreshToken);

router.post("/logout",authenticateToken, logout);
router.post("/logoutall", authenticateToken, checkRoles('admin'), logoutAll);
router.get("/getSession", authenticateToken, checkOwnerOrAdmin, getSession);
router.post("/revokesession", authenticateToken, checkRoles('admin'), revokeSession);

export default router;
