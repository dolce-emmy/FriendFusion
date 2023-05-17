import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import PostList from "./PostList";
import UserInfo from "./UserInfo";
import Header from "./Header";

const PublicProfile = () => {
  let { id } = useParams();
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    api.get(`/users/${id}`).then((res) => {
      setUser(res.data.data);
    });

    api.get(`/posts/user/${id}`).then((res) => {
      const posts = res.data.data ?? [];
      setUserPosts(posts.reverse());
    });
  }, [id]);

  const updateLikesForPosts = (id, post) => {
    // find the post in the posts array
    // update the likes for the post in the posts array
    const updatedPosts = userPosts.map((p) =>
      p._id === id ? { ...p, likes: post?.likes } : p
    );
    setUserPosts(updatedPosts);
  };

  return (
    <>
      <Header />
      <div className="w-5/6 mx-auto flex flex-col md:flex-row items-start gap-6 mt-10">
        <div className="w-full md:w-4/12 lg:w-3/12 lg:max-w-xs">
          <UserInfo user={user} />
        </div>

        <div className="w-full md:w-8/12 lg:w-6/12 lg:max-w-xl">
          <PostList
            posts={userPosts}
            updateLikesForPosts={updateLikesForPosts}
          />
        </div>
        <div className="w-full md:hidden lg:block lg:w-3/12 lg:max-w-xs">
          {/* TODO: advertisements, friends list */}
        </div>
      </div>
    </>
  );
};

export default PublicProfile;
