import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import UserBasicInfo from "./UserBasicInfo";
import api from "../api";
import InputEmoji from "react-input-emoji";


const PostComment = ({ postId, comment, onDeleteComment }) => {
  const { _id, content, user, createdAt } = comment;
  const { user: currentUser, handleDeleteCommentsForPost } = useAppContext();

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

  const extraInfo = (
    <>
      <span>{content}</span>
      {user?._id === currentUser._id && (
        <span
          className="block text-sm text-neutral-500 cursor-pointer hover:underline"
          onClick={() => handleDeleteComment(_id)}
        >
          remove
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

const PostComments = (post) => {
  const { _id, comments, populatedComments, getComments } = post;
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
          />
        ))}
      </div>

      
      
      
 


     
    </>
  );
};

export default PostComments;
