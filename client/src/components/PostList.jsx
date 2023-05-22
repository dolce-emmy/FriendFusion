import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import api from "../api";
import UserBasicInfo from "./UserBasicInfo";
import PostComments from "./PostComments";
import HeartIcon from "./icons/HeartIcon";
import RedHeartIcon from "./icons/RedHeartIcon";
import CommentsIcon from "./icons/CommentsIcon";
import DeleteIcon from "./icons/DeleteIcon";

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
    <div className="px-1 py-3 bg-neutral-800 rounded-2xl">
      <UserBasicInfo
        user={user}
        className="p-4"
        extraInfo={user?.location}
        extraInfoClassName="text-sm text-neutral-400"
        timeStamp={createdAt}
      />
      <div className="p-4">
        <p className="mb-3">{description}</p>
        {images.map((image) => (
          <img
            key={image?._id}
            className="w-full"
            src={image?.url}
            alt={image?.name}
          />
        ))}
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
          {user?._id === currentUser?._id && (
            <button
              onClick={handleDelete}
              className="flex gap-1 text-sm items-center text-red-500 ml-auto"
            >
              <span>
                <DeleteIcon />
              </span>
              {/* <span>Delete</span> */}
            </button>
          )}
        </div>
      </div>
      <div className={showComments ? "block mt-6" : "hidden"}>
        <PostComments
          _id={_id}
          comments={comments}
          populatedComments={populatedComments}
          getComments={getComments}
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
