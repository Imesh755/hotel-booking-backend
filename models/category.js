import mongoose from "mongoose";
import { type } from "os";
import { features } from "process";

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required : true,
        inuque:true
    },
    price:{
        type:Number,
        required : true
    },
    features:[
        {
            type:String
        }
    ],
    description:{
        type:String,
        required:true
    },
    image:{
        type:String
    }

})

const Category = mongoose.model("categories",categorySchema)
export default Category;