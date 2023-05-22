import { useState, useEffect, createContext, useContext } from "react";
import api from "../api";
import { useNavigate, useLocation } from "react-router-dom";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAuthPage =
      location.pathname.includes("/login") ||
      location.pathname.includes("/register");

    if (!token) {
      if (!isAuthPage) {
        navigate("/login");
      }
    } else {
      const userObj = JSON.parse(localStorage.getItem("user"));
      if (userObj && !user) {
        api.get(`/users/${userObj._id}`).then((res) => {
          //console.log("userObj:", userObj._id)
          //console.log(res.data.data);
          setUser(res.data.data);
        });
      }

      api.get("/posts").then((res) => {
        // console.log(res.data);
        setPosts((res.data.data ?? []).reverse());
      });
    }
  }, [user]);

  const updatePosts = (post) => {
    // here we are adding the new post to the posts array in the state of the context provider so that we can update the post page with the new post
    // the post in the argument is the new post that we are adding to the posts array
    setPosts([post, ...posts]);
  };

  // we want to delete the posts from the state of the post page
  // we want to delete the posts from the backend
  const handleDeletePost = (id) => {
    // here we are filtering the posts array in the state of the context provider so that we can update the post page with the new posts
    // the posts in the argument is the new posts that we are adding to the posts array
    const updatedPosts = posts.filter((p) => p._id !== id);
    setPosts(updatedPosts);
  };

  const handleLikesForPost = (id, post) => {
    // find the post in the posts array
    // update the likes for the post in the posts array
    const updatedPosts = posts.map((p) =>
      p._id === id ? { ...p, likes: post?.likes } : p
    );

    setPosts(updatedPosts);
  };

  // to update the comments for a post in the posts array we need to find the post in the posts array and update the comments for that post
  const handleAddCommentsForPost = (id, comment) => {
    //   // find the post in the posts array
    //   // update the comments for the post in the posts array
    // here we are adding the new comment to the comments array in the state of the context provider so that we can update the post page with the new comment
    const updatedPosts = posts.map((p) =>
      p._id === id ? { ...p, comments: [...p.comments, comment._id] } : p
    );
    setPosts(updatedPosts);
  };

  const handleDeleteCommentsForPost = (id, comment) => {
    const updatedPosts = posts.map((p) =>
      p._id === id
        ? {
            ...p,
            comments: p.comments?.filter((c) => c !== comment._id),
          }
        : p
    );
    setPosts(updatedPosts);
  };

  const handleUpdateUser = (user) => {
    setUser(user);
  };





  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        posts,
        setPosts,
        updatePosts,
        handleLikesForPost,
        handleAddCommentsForPost,
        handleDeleteCommentsForPost,
        handleUpdateUser,
        handleDeletePost,
       
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// AppContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export const useAppContext = () => {
// const {users} = useContext(AppContext);

// return users;
// }

export const useAppContext = () => useContext(AppContext);

// import PropTypes from "prop-types";

// export const Login = ({ firstName, lastName, email, password }) => {
//   console.log({ firstName, lastName, email, password });
//   return <div>Login</div>;
// };

// Login.propTypes = {
//   firstName: PropTypes.number.isRequired,
//   lastName: PropTypes.string.isRequired,
//   email: PropTypes.bool.isRequired,
//   password: PropTypes.string.isRequired,
// };
