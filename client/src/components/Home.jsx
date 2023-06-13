import React from "react";
import UserInfo from "./UserInfo";
import Header from "./Header";
import PostForm from "./PostForm";
import PostList from "./PostList";
import Youtube from "./Youtube";
import Advertisement from "./Advertisement";
import { useAppContext } from "../context/AppContext";
import UserBasicInfo from "./UserBasicInfo";
import ChatGpt from "./ChatGpt";
import { useThemeContext } from "../context/ThemeContext";

const Home = () => {
  const { isDarkMode } = useThemeContext();
  const { user, posts, handleLikesForPost } = useAppContext();
  return (
    <div>
      {/* Header */}
      <Header />
      <div className="px-10 w-full max-w-screen-2xl mx-auto flex flex-col md:flex-row items-start gap-6 mt-10">
        <div className="w-full md:w-4/12 lg:w-3/12">
          <div className="flex flex-col gap-6">
            <UserInfo user={user} />
            <ChatGpt />
          </div>
        </div>
        <div className="w-full md:w-8/12 lg:w-6/12 flex-grow shrink-0">
          <PostForm />
          <PostList posts={posts} updateLikesForPosts={handleLikesForPost} />
        </div>
        <div className="w-full md:hidden lg:block lg:w-3/12">
          <div className="flex flex-col gap-6">
            <Youtube />
            <Advertisement />
            <div
              className={`${
                isDarkMode ? "dark" : "light"
              } w-full flex flex-col gap-4 rounded-2xl p-6 shadow-md`}
            >
              <h3 className="text-xl text-center font-semibold mb-4">
                Friends List
              </h3>
              {user?.friends?.map((user) => (
                <UserBasicInfo key={user._id} user={user} showToggleFriend />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default Home;
