import mongoose from "mongoose";

export const connectDB = async ()=>{
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error("FATAL ERROR: MONGO_URI is not defined in the environment variables.");
        process.exit(1);
    }
    await mongoose.connect(mongoUri)
    .then(() =>console.log("DB Connected"))
}