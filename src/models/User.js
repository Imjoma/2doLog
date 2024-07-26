import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ** OverwriteModelError: Cannot overwrite `User` model once compiled.
// ... must specify
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
