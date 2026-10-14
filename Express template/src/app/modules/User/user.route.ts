import express from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.get(
  "/me",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserController.getMyProfile
);

router.patch(
  "/me",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(UserValidation.updateProfileZodSchema),
  UserController.updateMyProfile
);

// Admin-only management routes
router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserController.getAllUsers
);

router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserController.getUserById
);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(UserValidation.updateUserByAdminZodSchema),
  UserController.updateUserByAdmin
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserController.deleteUser
);

export const UserRoutes = router;
