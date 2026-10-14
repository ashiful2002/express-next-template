import express from "express";
import { AuthController } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
const router = express.Router();

router.post("/sign-up", AuthController.signUp);
router.post("/sign-in", AuthController.login);
router.get("/me", auth(), AuthController.getMe);

router.post("/refresh-token", AuthController.getNewToken);
router.post("/change-password", auth(), AuthController.changePassword);

router.post("/logout", auth(), AuthController.logoutUser);
router.post("/verify-email", auth(), AuthController.verifyEmail);
router.post("/forgot-password", auth(), AuthController.forgotPassword);
router.post("/reset-password", auth(), AuthController.resetPassword);

// google login, error, success

router.get("/sign-in/google", AuthController.googleLogin);
router.get("/google/success", AuthController.googleLoginSuccess);
router.get("/google/error", AuthController.handleOAuthError);
export const AuthRoutes = router;
