import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    id: String,
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    dob: Date,
    role: {
      type: String,
      default: "STUDENT",
      enum: ["STUDENT", "FACULTY", "ADMIN"],
    },
  },
  {
    collection: "users",
  }
);

export default userSchema;
