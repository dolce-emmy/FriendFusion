import express from "express";
const router = express.Router();
import {
  getAllComments,
  getAllCommentsByIds,
  getSingleCommentById,
  createComment,
  updateCommentById,
  deleteCommentById,
  replyCommentById,
} from "../controllers/commentsController.js";
import { auth } from "../middlewares/auth.js";

//GET all comments
router.get("/", getAllComments);

router.post("/", getAllCommentsByIds);

//GET to get a single comment
router.get("/:id", getSingleCommentById);

//POST to add a new comment
router.post("/:postId", auth, createComment);

//PATCH to update a single comment
router.patch("/:id", updateCommentById);

//DELETE to delete a single comment
router.post("/:id/post/:postId", deleteCommentById);

//POST to reply to comment
router.post("/:id/reply", auth, replyCommentById);

export default router;
