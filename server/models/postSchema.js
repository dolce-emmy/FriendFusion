import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    description: {
      type: String,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    // here I am using the userId as the reference to the user who liked the post
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
  },
  { timestamps: true }
);

const PostCollection = model("Post", postSchema);

export default PostCollection;
