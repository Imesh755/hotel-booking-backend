import express from "express";
import { getUsers , postUser,deleteUsers,putUsers, loginUser } from "../controllers/userControllers.js";

const userRouter = express.Router(); // Ensure parentheses to instantiate the router

// Define routes
userRouter.get("/", getUsers);

userRouter.post("/",postUser);

userRouter.delete("/",deleteUsers);

userRouter.put("/",putUsers );

userRouter.post("/login",loginUser);

export default userRouter;
