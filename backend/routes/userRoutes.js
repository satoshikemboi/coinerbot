
// backend/routes/userRoutes.js
import express from "express";
import { getMyProfile } from "../controllers/userController.js"; 
import { protect } from "../middleware/authMiddleware.js";

import { 
  getUsers, 
  getUserById,
  updateUser, 
  deleteUser, 
  signupUser, 
  loginUser 
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile", protect, getMyProfile);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
