"use server";
import Meetup from "../models/meetUps"; // ✅ Correct import
import { connectToDB } from "../lib/connectToDB";
import { revalidatePath } from "next/cache";
import User from "../models/User";
export const createMeetUp = async (userId, formData) => {

  try {

    //console.log("previous State", prevState);
    await connectToDB();
    const user=await User.findById(userId)
    if (!user) return { error: "User not found" }; // Ensure user exists

    const newMeetUp = new Meetup({
      name: user.name,
      email:user.email,
      reason: formData.get("reason"),
      location:formData.get("location"),
      date: formData.get("date"),
      user: userId
    });
    //const user =await User.find(user)
    await newMeetUp.save();
    await user.meetups.push(newMeetUp);
    await user.save();
    //user.meetups.push(newMeetUp._id)
    // user.save()
    revalidatePath('/')
    return { message: "MeetUp Saved Successfully" };
  } catch (err) {
    console.log("❌ Error saving meetup:", err);
    return { message: "Saving details failed" };
  }
};

export async function getMeetups() {
  try {
    await connectToDB();
    const meetups = await Meetup.find().populate("user").sort({ createdAt: -1 }).lean(); // Keep using .lean()
    return JSON.parse(JSON.stringify(meetups)); 
  } catch (err) {
    console.log("Fetching data failed", err);
    throw err;
  }
}

export async function deleteMeetup(id,userId) {
  try {
    await connectToDB();
    let meetup=await Meetup.findById(id).populate("user")
    if (!meetup) {
      return { error: "Meetup not found" };
    }
    if(meetup.user._id.toString()!==userId){
      return { error: "Unauthorized: You can only delete your own meetups" };
    }
    await meetup.user.meetups.pull(meetup._id)
    await meetup.user.save()
    await meetup.deleteOne()
    revalidatePath("/");
    return { message: "deleted successfully" };
  } catch (err) {
    return { error: "unable to delete" };
  }
}

export const  getUserMeetups=async(userId)=>{
  try{
    await connectToDB()
    const meetups=await Meetup.find({user:userId}).populate("user").sort({ createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(meetups))
  }catch(err){
    console.log(err)
    throw err
  }
}