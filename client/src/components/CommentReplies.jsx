// here we want to add the reply to the comment
// we want to add the reply to the backend
import { useState } from "react";
import api from "../api";
import InputEmoji from "react-input-emoji";
import { useAppContext } from "../context/AppContext";
import UserBasicInfo from "./UserBasicInfo";
import CommentIcon from "./icons/CommentIcon";

const CommentReply = ({ _id, user, content, createdAt }) => {
  const { user: currentUser } = useAppContext();

  const extraInfo = (
    <>
      <span>{content}</span>
      {user?._id === currentUser?._id && (
        <span className="flex justify-between block mt-1">
          <span
            className="block text-sm text-neutral-500 cursor-pointer hover:underline"
            //onClick={() => handleDeleteReplz(_id)}
          >
            remove
          </span>
        </span>
      )}
    </>
  );

  return (
    <div key={_id}>
      <UserBasicInfo user={user} extraInfo={extraInfo} timeStamp={createdAt} />
    </div>
  );
};

const CommentReplies = ({ comment, onAddReplyForComment }) => {
  const { _id, replies } = comment;
  const [reply, setReply] = useState("");

  const handleReply = (content) => {
    const data = new FormData();
    data.append("content", content);

    api
      .post(`/comments/${_id}/reply`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.success) {
          onAddReplyForComment(_id, res.data.data?.replies);
          setReply("");
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };

  console.log({ replies });

  return (
    <>
      <div className="my-2">
        <InputEmoji
          value={reply}
          onChange={setReply}
          cleanOnEnter
          onEnter={handleReply}
          placeholder="Add a reply"
        />
      </div>

      {replies?.map((reply) => (
        <CommentReply key={reply._id} {...reply} />
      ))}
    </>
  );
};

export default CommentReplies;
