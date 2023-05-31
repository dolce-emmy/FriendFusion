import React from "react";
import { useAppContext } from "../context/AppContext";
import api from "../api";
import HandleRemoveFriendIcon from "./icons/HandleRemoveFriendIcon";
import HandleAddFriendIcon from "./icons/HandleAddFriendIcon";
import { useThemeContext } from "../context/ThemeContext";

const ToggleFriendButton = ({ user }) => {
  const { isDarkMode } = useThemeContext();
  const { user: currentUser, handleUpdateUser } = useAppContext();

  const handleAddFriend = (friendId) => {
    const data = new FormData();
    data.append("friendId", friendId);

    api
      .post(`/users/addFriend/${currentUser._id}`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.success) {
          handleUpdateUser(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveFriend = (friendId) => {
    const data = new FormData();
    data.append("friendId", friendId);

    api
      .post(`/users/removeFriend/${currentUser._id}`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.success) {
          handleUpdateUser(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    user?._id !== currentUser?._id && (
      <>
        {!currentUser?.friends?.some((friend) => friend._id === user?._id) ? (
          <button
            onClick={() => handleAddFriend(user?._id)}
            className={`${
              isDarkMode ? "dark-hover" : "light-hover"
            } ml-auto rounded-full w-10 h-10 flex items-center justify-center shrink-0`}
          >
            <HandleAddFriendIcon />
          </button>
        ) : (
          <button
            onClick={() => handleRemoveFriend(user?._id)}
            className={`${
              isDarkMode ? "dark-hover" : "light-hover"
            } ml-auto rounded-full w-10 h-10 flex items-center justify-center shrink-0`}
          >
            <HandleRemoveFriendIcon />
          </button>
        )}
      </>
    )
  );
};

export default ToggleFriendButton;
