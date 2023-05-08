import express from "express";
const router = express.Router();
import {
  getSingleImageById,
  createImage,
  createMultipleImages,
} from "../controllers/imagesController.js";

//GET to get a single Image
router.get("/:id", getSingleImageById);

//POST to add a new Image
router.post("/", createImage);


// post to add multiple images
router.post("/multiple", createMultipleImages);

export default router;
