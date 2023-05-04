import express from "express";
const router = express.Router();
import {
  getAllComments,
  getSingleCommentById,
  createComment,
  updateCommentById,
  deleteCommentById,
  replyCommentById,
} from "../controllers/commentsController.js";

//GET all comments
router.get("/", getAllComments);

//GET to get a single comment
router.get("/:id", getSingleCommentById);

//POST to add a new comment
router.post("/:postId", createComment);

//PATCH to update a single comment
router.patch("/:id", updateCommentById);

//DELETE to delete a single comment
router.delete("/:id", deleteCommentById);

//POST to reply to comment
router.post("/:id/reply", replyCommentById);

export default router;
