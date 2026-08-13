import express from 'express';
import authMiddleware from "../middleware/auth.js";
import { addCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post("/add", authMiddleware, addCategory);
categoryRouter.get("/get", authMiddleware, getCategories);
categoryRouter.put("/update/:id", authMiddleware, updateCategory);
categoryRouter.delete("/delete/:id", authMiddleware, deleteCategory);

export default categoryRouter;