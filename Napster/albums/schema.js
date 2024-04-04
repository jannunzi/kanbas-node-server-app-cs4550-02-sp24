import mongoose from "mongoose";
const albumSchema = new mongoose.Schema(
  {
    name: String,
    albumId: String,
    likedBy: [
      {
        ref: "Users",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { collection: "albums" }
);
export default albumSchema;
