'use server'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDB } from "../lib/connectToDB";
import User from "../models/User";

const SECRET_KEY = "your_secret_key"; // Store in .env

export const signup = async (prevState, formData) => {
  try {
    console.log("previous State", prevState);
    await connectToDB();
    let existingUser
    existingUser=await User.findOne({email:formData.get("email")}).lean()
    if(existingUser){
        return {message:"user exist Please login"}
    }
    const hashedPassword = await bcrypt.hash(formData.get("password"), 12);

    const newUser = new User({
      name: formData.get("name"),
      email: formData.get("email"),
      password: hashedPassword,
      meetups: []
    });
    
    // Save the new user
    const savedUser = await newUser.save();
    
    return { 
      message: "User Saved Successfully",
      userId: savedUser._id // Return the new user's ID if needed
    };
  } catch (err) {
    console.log("❌ Error saving User:", err);
    return { error: err.message || "Saving details failed" };
  }
};

export const login = async (prevState, formData) => {
  try {
    await connectToDB();

    const user = await User.findOne({ email: formData.get("email") }).lean();
    if (!user) {
      console.log("❌ User not found");
      return { error: "User not found" };
    }

    const isPasswordCorrect = await bcrypt.compare(formData.get("password"), user.password);
    if (!isPasswordCorrect) {
      console.log("❌ Invalid password");
      return { error: "Invalid password" };
    }

    const token = jwt.sign({ userId: user._id.toString(), email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    console.log("✅ Login successful!");
    return { message: "Login successful!", userId: user._id.toString(), token };
  } catch (err) {
    console.error("Login Error:", err);
    return { error: "Login failed. Try again later." };
  }
};
