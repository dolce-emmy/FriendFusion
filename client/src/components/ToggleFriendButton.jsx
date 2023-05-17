import React from "react";
import { useAppContext } from "../context/AppContext";
import api from "../api";

const ToggleFriendButton = ({ user }) => {
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
            className="ml-auto rounded-full bg-neutral-700 hover:bg-neutral-600 w-10 h-10 flex items-center justify-center shrink-0"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => handleRemoveFriend(user?._id)}
            className="ml-auto rounded-full bg-neutral-700 hover:bg-neutral-600 w-10 h-10 flex items-center justify-center shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </button>
        )}
      </>
    )
  );
};

export default ToggleFriendButton;
