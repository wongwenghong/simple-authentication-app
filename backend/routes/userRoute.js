import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getMe,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/me").get(protect, getMe);

export default router;
