import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  meetups: [{ type: mongoose.Types.ObjectId, ref: "Meetup" }]
});

// Improved model initialization
let User;
try {
  // Check if the model is already defined
  User = mongoose.model("User")
} catch (error) {
  User = mongoose.model("User", UserSchema);
}

export default User;