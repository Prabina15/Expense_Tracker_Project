import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    color: {
        type: String,
        default: "#6366f1"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, {
    timestamps: true
});

// A user can't have two custom categories with the same name and type
categorySchema.index({ userId: 1, name: 1, type: 1 }, { unique: true });

const categoryModel = mongoose.models.category || mongoose.model("Category", categorySchema);
export default categoryModel;