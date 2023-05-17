import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import api from "../api";
import UserBasicInfo from "./UserBasicInfo";
import PostComments from "./PostComments";

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
  const { user: currentUser } = useAppContext();
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
      <div className="flex items-center justify-between mx-4 mt-3 mb-2">
        <div className="flex gap-5">
          <button
            onClick={handleLike}
            className="flex gap-1 text-sm items-center"
          >
            <span>
              {!likes.includes(currentUser?._id) ? (
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-red-400"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              )}
            </span>
            <span>{likes.length} Likes</span>
          </button>
          <button
            onClick={toggleComments}
            className="flex gap-1 text-sm items-center"
          >
            <span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
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
