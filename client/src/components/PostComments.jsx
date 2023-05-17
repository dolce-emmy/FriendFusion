import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import UserBasicInfo from "./UserBasicInfo";
import api from "../api";
import InputEmoji from "react-input-emoji";

const PostComments = ({ _id, comments, populatedComments, getComments }) => {
  const { handleCommentsForPost } = useAppContext();
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
          handleCommentsForPost(_id, cmt);
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
          <div key={comment._id}>
            <UserBasicInfo
              user={comment.user}
              extraInfo={comment.content}
              timeStamp={comment.createdAt}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PostComments;
