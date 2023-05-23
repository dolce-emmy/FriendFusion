import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import UserBasicInfo from "./UserBasicInfo";
import api from "../api";
import InputEmoji from "react-input-emoji";
import CommentReplies from "./CommentReplies";
import CommentsIcon from "./icons/CommentsIcon";

const PostComment = ({
  postId,
  comment,
  onDeleteComment,
  handleAddReplyForComment,
}) => {
  const { _id, content, user, createdAt } = comment;
  const { user: currentUser, handleDeleteCommentsForPost } = useAppContext();
  const [showReplies, setShowReplies] = useState(false);
  // const [populatedReplies, setPopulatedReplies] = useState([]);

  // after that we need to delete the comments from the backend
  // and then we need to update the comments in the state of the post page
  const handleDeleteComment = (id) => {
    api
      .post(`/comments/${id}/post/${postId}`)
      .then((res) => {
        if (res.data.success) {
          handleDeleteCommentsForPost(postId, res.data.data);
          onDeleteComment();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getReplies = (ids) => {
    api
      .post(
        "/comments",
        { ids },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res.data.success) {
          handleAddReplyForComment(_id, res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
    if (!showReplies) {
      getReplies(comment.replies);
    }
  };

  const extraInfo = (
    <>
      <span>{content}</span>
      <span className="flex justify-between block mt-1">
        {user?._id === currentUser._id && (
          <span
            className="block text-sm text-neutral-500 cursor-pointer hover:underline"
            onClick={() => handleDeleteComment(_id)}
          >
            remove
          </span>
        )}
        <span
          onClick={toggleReplies}
          className="flex gap-1 text-sm items-center cursor-pointer ml-auto"
        >
          <span>
            <CommentsIcon />
          </span>
          <span>{comment.replies.length} Replies</span>
        </span>
      </span>
    </>
  );

  return (
    <div key={_id}>
      <UserBasicInfo user={user} extraInfo={extraInfo} timeStamp={createdAt} />

      <div className="px-8 mt-4">
        {showReplies && (
          <CommentReplies
            key={_id}
            comment={comment}
            onAddReplyForComment={handleAddReplyForComment}
          />
        )}
      </div>
    </div>
  );
};

const PostComments = (props) => {
  const {
    _id,
    comments,
    populatedComments,
    getComments,
    handleAddReplyForComment,
  } = props;
  const { handleAddCommentsForPost } = useAppContext();
  const [comment, setComment] = useState("");

  const handleComment = (content) => {
    const data = new FormData();
    data.append("content", content);

    api
      .post(`/comments/${_id}`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.success) {
          const cmt = res.data.data;
          handleAddCommentsForPost(_id, cmt);
          getComments([...comments, cmt._id]);
          setComment("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="mr-2 pl-2">
        <InputEmoji
          value={comment}
          onChange={setComment}
          cleanOnEnter
          onEnter={handleComment}
          placeholder="Write a comment"
        />
      </div>
      <div className="flex flex-col gap-4 px-4 mt-5 mb-3">
        {populatedComments?.map((comment) => (
          <PostComment
            key={comment._id}
            postId={_id}
            comment={comment}
            onDeleteComment={() =>
              getComments(comments?.filter((c) => c._id !== comment._id))
            }
            handleAddReplyForComment={handleAddReplyForComment}
          />
        ))}
      </div>
    </>
  );
};

export default PostComments;
