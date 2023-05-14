import React from "react";
import { useAppContext } from "../context/AppContext";

const Post = ({ description, images, user }) => {

  
  return (
    <div className="px-1 py-3 bg-neutral-800 rounded-2xl">
      <div className="flex items-center px-4 py-3">
        <img
          className="h-14 w-14 rounded-full"
          src={user?.image?.url}
        />
        <div className="ml-3 ">
          <span className="text-sm font-semibold antialiased block leading-tight">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="text-neutral-400 text-xs block">
            {user?.location}
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="mb-3">{description}</p>
        {images.map((image) => (
          <img
            key={image?._id}
            className="w-full"
            src={image.url}
            alt={image.name}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mx-4 mt-3 mb-2">
        <div className="flex gap-5">
          <div className="flex gap-1 text-sm items-center">
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </span>
            <span>12 likes</span>
          </div>

          <div className="flex gap-1 text-sm items-center">
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
            <span>12 likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostList = () => {
  const { posts } = useAppContext();
  console.log({ posts });
  return (
    <div className="w-full flex flex-col gap-6">
      {posts?.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </div>
  );
};

export default PostList;
