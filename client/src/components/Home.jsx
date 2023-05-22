import React from "react";
import UserInfo from "./UserInfo";
import Header from "./Header";
import PostForm from "./PostForm";
import PostList from "./PostList";
import { useAppContext } from "../context/AppContext";
import UserBasicInfo from "./UserBasicInfo";

const Home = () => {
  const { user, posts, handleLikesForPost } = useAppContext();
  return (
    <div>
      {/* Header */}
      <Header />
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start gap-6 mt-10">
        <div className="w-full md:w-4/12 lg:w-3/12 lg:max-w-xs">
          <UserInfo user={user} />
        </div>
        <div className="w-full md:w-8/12 lg:w-6/12 flex-grow shrink-0">
          <PostForm />
          <PostList posts={posts} updateLikesForPosts={handleLikesForPost} />
        </div>
        <div className="w-full md:hidden lg:block lg:w-3/12 lg:max-w-xs">
          {/* TODO: advertisements, friends list */}
          <div className="w-full flex flex-col gap-4 bg-neutral-800 rounded-2xl p-5">
            <h1 className="text-xl font-semibold mb-4">Friends List</h1>
            {user?.friends?.map((user) => (
              <UserBasicInfo key={user._id} user={user} showToggleFriend />
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
    </div>
  );
};

export default Home;
