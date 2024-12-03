import express from "express";
import { getGalleryItem, postGalleryItem } from "../controllers/galleryItemContral.js"; // Corrected controller import

const galleryItemRouter = express.Router();

// POST route for creating a gallery item
galleryItemRouter.post("/", postGalleryItem);
galleryItemRouter.get("/",getGalleryItem);

export default galleryItemRouter;

