import express from "express";
import { verifyToken } from "../middlewares/auth";
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/users";
const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
