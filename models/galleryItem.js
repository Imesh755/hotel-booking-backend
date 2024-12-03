import mongoose from "mongoose";

// Define the gallery item schema
const galleryItemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
            trim: true,
        },
        description: { // Fixed spelling from 'discription'
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

// Create and export the model
const GalleryItem = mongoose.model("GalleryItem", galleryItemSchema);

export default GalleryItem;
