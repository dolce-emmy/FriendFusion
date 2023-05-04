import express from "express";
const router = express.Router();
import {
  getSingleImageById,
  createImage,
} from "../controllers/imagesController.js";

//GET to get a single Image
router.get("/:id", getSingleImageById);

//POST to add a new Image
router.post("/", createImage);

export default router;
