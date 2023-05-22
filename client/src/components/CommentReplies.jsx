// here we want to add the reply to the comment
// we want to add the reply to the backend

import { useState } from "react";
import api from "../api";
import { useAppContext } from "../context/AppContext";
import InputEmoji from "react-input-emoji";

const CommentReplies = ({ commentId, replies }) => {
    const { _id, content, user, createdAt } = replies;
  const { user: currentUser, handleAddReplyForComment } = useAppContext();
  const [reply, setReply] = useState("");

  const handleReply = (content) => {
    const data = new FormData();
    data.append("content", content);

    api
      .post(`${commentId}/replies`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.success) {
          handleAddReplyForComment(commentId, res.data.data);
          setReply("");
        }
      })

      .catch((err) => {
        console.log(err);
      });

    return (
      <>
        <div>
          <input
            value={reply}
            onChange={setReply}
            cleanOnEnter
            onEnter={handleReply}
            placeholder="Add a reply"
          />
        </div>

        <div>
          {replies.map((reply) => (
            <div key={reply._id}>
              <CommentReplies commentId={commentId} replies={reply} />
            </div>
          ))}
        </div>
      </>
    );
  };
};

export default CommentReplies;
