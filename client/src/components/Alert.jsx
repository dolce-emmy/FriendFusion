import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import Header from "./Header.jsx";
import SpinnerIcon from "./icons/SpinnerIcon";
import { useThemeContext } from "../context/ThemeContext";

const Alert = ({ toggleCommentForm }) => {
    const { isDarkMode } = useThemeContext();
    const [formData, setFormData] = useState({
        question1: "",
        question2: "",
        question3: "",
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
            {/* text-center text-xl font-semibold py-3 */}
            <div className="p-3 border-b">
              <h2 className="text-center text-xl font-semibold py-3">
                Add Your Alert
              </h2>
            </div>
            <form className="p-4" onSubmit={onSubmitHandler}>
              <div className="mb-4">
                <label className="text-xl font mb-4" htmlFor="question1">
                  Name:
                </label>
                <input
                  className="w-full"
                  type="text"
                  name="question1"
                  id="question1"
                  placeholder="Your Name"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="text-xl font mb-4" htmlFor="message">
                  Message:
                </label>
                <textarea
                  className="w-full"
                  name="message"
                  id="message"
                  placeholder="Enter your message"
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  disabled={loading}
                  onClick={onSubmitHandler}
                  className="ml-auto  btn"
                >
                  {loading ? <SpinnerIcon /> : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
};

export default Alert;
