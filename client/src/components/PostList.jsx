import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import api from "../api";
import UserBasicInfo from "./UserBasicInfo";
import PostComments from "./PostComments";
import HeartIcon from "./icons/HeartIcon";
import RedHeartIcon from "./icons/RedHeartIcon";
import CommentsIcon from "./icons/CommentsIcon";
import DeleteIcon from "./icons/DeleteIcon";
import PreviewImages from "./PreviewImages";
import Linkify from "linkify-react";
import MoreOptions from "./MoreOptions";

const Post = ({
  _id,
  description,
  images,
  likes,
  comments,
  user,
  createdAt,
  updateLikesForPosts,
}) => {
  const { user: currentUser, handleDeletePost } = useAppContext();
  const [showComments, setShowComments] = useState(false);
  const [populatedComments, setPopulatedComments] = useState([]);

  const handleLike = (e) => {
    e.preventDefault();
    api
      .post(`/posts/${_id}/like`, { userId: currentUser._id })
      .then((res) => {
        if (res.data.success) {
          // here we are adding id to the handleLikesForPost function so that we can update the likes in the state of the post with the id
          // we are passing the updated likes from the backend to the handleLikesForPost function so that we can update the likes in the state of the post with the id

          updateLikesForPosts(_id, res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    if (!showComments && populatedComments.length === 0) {
      getComments(comments);
    }
  };

  const getComments = (ids) => {
    api
      .post(
        "/comments",
        { ids },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res.data.success) {
          setPopulatedComments(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddReplyForComment = (id, replies) => {
    const updatedCommentsWithReplies = populatedComments.map((comment) => {
      if (comment._id === id) {
        return { ...comment, replies };
      }
      return comment;
    });
    setPopulatedComments(updatedCommentsWithReplies);
  };

  const handleDeleteReplyForComment = (id, reply) => {
    const updatedCommentsWithReplies = populatedComments.map((comment) => {
      if (comment._id === id) {
        return {
          ...comment,
          replies: comment.replies.filter((_id) => reply._id),
        };
      }
      return comment;
    });
    setPopulatedComments(updatedCommentsWithReplies);
  };

  // we want to delete the reply from the state of the comments page
  // we need to delete the reply from the backend

  // const handleDeleteReply = (id) => {
  //   api.post(`/comments/${id}/reply/${replyId}`).then((res) => {
  //     if (res.data.success) {
  //       handleAddReplyForComment(_id, res.data.data);

  //       onDeleteReply();

  //       // here we are passing the id of the comment and the updated replies to the handleAddReplyForComment function
  //     }
  //   });
  // };

  const handleDelete = (e) => {
    e.preventDefault();
    api
      .delete(`/posts/${_id}/user/${currentUser._id}`)
      .then((res) => {
        if (res.data.success) {
          handleDeletePost(_id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="px-1 py-3 bg-neutral-800 rounded-2xl relative">
      {user?._id === currentUser?._id && (
        <MoreOptions handleDelete={handleDelete} />
      )}
      <UserBasicInfo
        user={user}
        className="p-4"
        extraInfo={user?.location}
        extraInfoClassName="text-sm text-neutral-400"
        timeStamp={createdAt}
      />
      <div className="p-4">
        {description && (
          <p className="mb-3 post-description">
            <Linkify>{description}</Linkify>
          </p>
        )}

        <PreviewImages images={images} />
      </div>
      <div className="mx-4 mt-3 mb-2">
        <div className="flex gap-5">
          <button
            onClick={handleLike}
            className="flex gap-1 text-sm items-center"
          >
            <span>
              {!likes.includes(currentUser?._id) ? (
                <HeartIcon />
              ) : (
                <RedHeartIcon />
              )}
            </span>
            <span>{likes.length} Likes</span>
          </button>
          <button
            onClick={toggleComments}
            className="flex gap-1 text-sm items-center"
          >
            <span>
              <CommentsIcon />
            </span>
            <span>{comments.length} Comments</span>
          </button>
        </div>
      </div>
      <div className={showComments ? "block mt-6" : "hidden"}>
        <PostComments
          _id={_id}
          comments={comments}
          populatedComments={populatedComments}
          getComments={getComments}
          handleAddReplyForComment={handleAddReplyForComment}
          handleDeleteReplyForComment={handleDeleteReplyForComment}
        />
      </div>
    </div>
  );
};

const PostList = ({ posts, updateLikesForPosts }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      {posts?.map((post) => (
        <Post
          key={post._id}
          {...post}
          updateLikesForPosts={updateLikesForPosts}
        />
      ))}
    </div>
  );
};

export default PostList;
