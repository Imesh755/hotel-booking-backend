import GalleryItem from "../models/GalleryItem.js";

export async function postGalleryItem(req, res) {
    const user = req.user
    if(user == null){
        res.status(403).json({
            message : "Please login to create a gallery item"
        })
    }
    if(user.type !="admin"){
        res.status(403).json({
            message : "You are not authorizes to create a gallery item"
        })
        return
    }

    try {
        const galleryItemData = req.body.item; // Use a descriptive variable name
        const newGalleryItem = new GalleryItem(galleryItemData);

        await newGalleryItem.save(); // Save gallery item to the database
        
        res.json({
            message: "Gallery Item Created Successfully",
        });
    } catch (error) {
        console.error("Error creating gallery item:", error); // Log error for debugging
        res.status(500).json({
            message: "Gallery Item Creation Failed",
        });
    }
}

export function getGalleryItem(req,res){
    GalleryItem.find().then(
        (list)=>{
            res.json({
                list:list
            })
        }
    )
}