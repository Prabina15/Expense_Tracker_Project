import categoryModel from "../models/categoryModel.js";

// add a custom category
export async function addCategory(req, res) {
    const userId = req.user._id;
    const { name, type, color } = req.body;

    try {
        if (!name || !type) {
            return res.status(400).json({
                success: false,
                message: "Name and type are required"
            });
        }
        if (!["income", "expense"].includes(type)) {
            return res.status(400).json({
                success: false,
                message: "Type must be either 'income' or 'expense'"
            });
        }

        const newCategory = new categoryModel({
            userId,
            name: name.trim(),
            type,
            color: color || "#6366f1"
        });
        await newCategory.save();

        res.json({
            success: true,
            message: "Category added successfully",
            category: newCategory
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "You already have a category with this name"
            });
        }
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

// get all custom categories for the user, optionally filtered by type
export async function getCategories(req, res) {
    const userId = req.user._id;
    const { type } = req.query;

    try {
        const filter = { userId };
        if (type && ["income", "expense"].includes(type)) {
            filter.type = type;
        }
        const categories = await categoryModel.find(filter).sort({ createdAt: -1 });
        res.json({
            success: true,
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

// update a custom category's name/color
export async function updateCategory(req, res) {
    const { id } = req.params;
    const userId = req.user._id;
    const { name, color } = req.body;

    try {
        const updateFields = {};
        if (name !== undefined) updateFields.name = name.trim();
        if (color !== undefined) updateFields.color = color;

        const updatedCategory = await categoryModel.findOneAndUpdate(
            { _id: id, userId },
            updateFields,
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.json({
            success: true,
            message: "Category updated successfully",
            category: updatedCategory
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "You already have a category with this name"
            });
        }
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

// delete a custom category
// Note: transactions store category as a plain string snapshot, not a reference,
// so deleting a category here does not touch any existing income/expense records.
export async function deleteCategory(req, res) {
    const userId = req.user._id;

    try {
        const category = await categoryModel.findOneAndDelete({ _id: req.params.id, userId });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        res.json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}