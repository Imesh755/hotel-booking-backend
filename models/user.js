import { fstatSync } from "fs";
import mongoose from "mongoose";
import { type } from "os";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
   password:{
    type:String,
    required:true
   },
   firstName :{
    type : String,
    required : true
   },
   lastName : {
    type:String,
    required:true
   },
   type:{
    type:String,
    required:true,
    default:"customer"
   },
   whatsApp:{
    type:String,
    required:true
   },
   disable: {
    type:Boolean,
    required:true,
    default:false
   },
   emailVerified : {
    type : Boolean,
    required : true,
    default : false
   }
});

const User = mongoose.model("User", userSchema); // Ensure the model name is singular

export default User;
