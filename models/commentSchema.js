import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const CommentCollection = model("Comment", commentSchema);

export default CommentCollection;
