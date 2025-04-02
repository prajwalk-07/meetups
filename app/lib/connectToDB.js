'use server'
import mongoose from "mongoose";

export const connectToDB = async () => {

    try {
        console.log("🔄 Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ Successfully connected to MongoDB.");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw new Error("Database connection failed.");
    }
};
