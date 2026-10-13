import express from "express";
import { AuthController } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
const router = express.Router();

router.post("/sign-up", AuthController.signUp);
router.post("/sign-in", AuthController.login);
router.get(
  "/me",
  auth(
    UserRole.ADMIN,
    UserRole.CUSTOMER,
    UserRole.TRADER,
    UserRole.SUPER_ADMIN
  ),
  AuthController.getMe
);

router.post("/refresh-token", AuthController.getNewToken);
router.post(
  "/change-password",
  auth(
    UserRole.ADMIN,
    UserRole.CUSTOMER,
    UserRole.TRADER,
    UserRole.SUPER_ADMIN
  ),
  AuthController.changePassword
);

router.post(
  "/logout",
  auth(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.CUSTOMER,
    UserRole.TRADER
  ),
  AuthController.logoutUser
);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);

// google login, error, success

router.get("/login/google", AuthController.googleLogin);
router.get("/google/success", AuthController.googleLoginSuccess);
router.get("/google/error", AuthController.handleOAuthError);
export const AuthRoutes = router;
