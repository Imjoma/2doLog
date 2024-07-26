import mongoose from "mongoose";

const { Schema } = mongoose;

const ideaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    visibility: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ** OverwriteModelError: Cannot overwrite `Post` model once compiled.
// ... must specify
const Idea = mongoose.models.ideas || mongoose.model("ideas", ideaSchema);

export default Idea;
