// here we want to add the reply to the comment
// we want to add the reply to the backend
import { useState } from "react";
import api from "../api";
import InputEmoji from "react-input-emoji";
import { useAppContext } from "../context/AppContext";
import UserBasicInfo from "./UserBasicInfo";

const CommentReply = ({
  _id,
  commentId,
  user,
  content,
  createdAt,
  onDeleteReplyForComment,
}) => {
  const { user: currentUser } = useAppContext();

  // we want to delete the reply from the backend
  // we need to update the reply in the state of the comments page
  // we need to delete the reply from the state of the comments page

  const handleDeleteReply = (id) => {
    api.post(`/comments/${commentId}/reply/${id}`).then((res) => {
      if (res.data.success) {
        onDeleteReplyForComment(_id, res.data.data);
      }
    });
  };

  const extraInfo = (
    <>
      <span>{content}</span>
      {user?._id === currentUser?._id && (
        <span className="flex justify-between mt-1">
          <span
            className="block text-sm text-neutral-500 cursor-pointer hover:underline"
            //onClick={() => handleDeleteReplz(_id)}
            onClick={() => handleDeleteReply(_id)}
          >
            remove
          </span>
        </span>
      )}
    </>
  );

  return (
    <div key={_id} className="mb-2">
      <UserBasicInfo
        dense
        user={user}
        extraInfo={extraInfo}
        timeStamp={createdAt}
      />
    </div>
  );
};

const CommentReplies = ({
  comment,
  onAddReplyForComment,
  onDeleteReplyForComment,
}) => {
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

  // we want to delete the reply from the state of the comments page
  // we need to delete the reply from the backend
  // we need to update the reply in the state of the comments page

  // const handleDeleteReply = (id) => {
  //   api.post(`/comments/${id}/reply/${replies._Id}`).then((res) => {
  //     if (res.data.success) {
  //       onAddReplyForComment(_id, res.data.data);
  //     }
  //   });
  // }

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
        <CommentReply
          key={reply._id}
          commentId={_id}
          {...reply}
          onDeleteReplyForComment={onDeleteReplyForComment}
        />
      ))}
    </>
  );
};

export default CommentReplies;
