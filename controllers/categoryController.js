import Category from "../models/category.js";

export function createCategory(req,res){
    
    if(req.user == null){
        res.status(404).json({
            message:"Unauthrized"
        })
        return
    }
    if(req.user.type !="admin"){
        res.status().json({
             message : "Frobidden"
        })
        return
    }


    const newCategory = new Category(req.body)
    newCategory.save().then(
        (result)=>{
            res.json({
                message:"Category created successfully"
            })
        }
    ).catch(
        (err)=>{
            res.json(
                {
                    message:"Category creation failed",
                    error :err
                }
            )
        }
    )





}

export function getCategory(res,res){
    Category.fine().then(
        (result)=>{
            res.json(
                {
                    categories : result
                }
            )
        }
        
    ).catch(
        ()=>{
            res.json(
                {
                    message:"faild to get categories"
                }
            )
        }
    )
}