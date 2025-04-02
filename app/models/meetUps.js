import mongoose from "mongoose";

const meetUpsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    reason: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    user:{type:mongoose.Types.ObjectId,required:true,ref:"User"}
});
let Meetup;

try {
  // Try to retrieve existing model
  Meetup = mongoose.model("Meetup");
} catch (error) {
  // Model doesn't exist yet, so create it
  Meetup = mongoose.model("Meetup", meetUpsSchema);
}

export default Meetup;