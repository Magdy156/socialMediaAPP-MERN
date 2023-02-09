import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.get("/", getFeedPosts);
router.get("/:userId", getUserPosts);

router.patch("/:id/like", likePost);

export default router;
