import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import Header from "./Header.jsx";
import SpinnerIcon from "./icons/SpinnerIcon";
import { useThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeContext();
  const [formData, setFormData] = useState({
    email: "",
    topic: "",
    description: "",
  });
  const { user } = useAppContext();
  const [loading, setLoading] = useState(false); // Assuming you have a loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setLoading(true); // Set loading state to true during form submission

    // Simulating an asynchronous request with setTimeout
    setTimeout(() => {
      setLoading(false); // Set loading state to false after form submission
      toggleCommentForm();
    }, 2000); // Adjust the timeout as needed
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen mt-[-80px]">
        <div
          className={`${
            isDarkMode ? "dark" : "light"
          } flex flex-col gap-4 items-center justify-center rounded-2xl p-4 shadow-md text-left`}
        >
          <h2 className="text-center text-2xl font-semibold py-3">
            How can we Improve?
          </h2>
          <form className="p-4" onSubmit={onSubmitHandler}>
            <div className="mb-4">
              <label className="text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full"
                type="text"
                name="email"
                id="email"
                defaultValue={user?.email}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-bold mb-2" htmlFor="topic">
                Topic
              </label>
              <input
                className="w-full"
                type="text"
                name="topic"
                id="topic"
                placeholder="Please enter the topic"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                className="w-full"
                name="description"
                id="description"
                placeholder="Please provide the description"
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                className={`${
                  isDarkMode ? "dark-hover" : "light-hover"
                } py-2 px-4 rounded-md`}
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={onSubmitHandler}
                className="ml-auto btn"
              >
                {loading ? <SpinnerIcon /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Feedback;
