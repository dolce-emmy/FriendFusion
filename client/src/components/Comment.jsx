import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import Header from "./Header.jsx";
import SpinnerIcon from "./icons/SpinnerIcon";
import { useThemeContext } from "../context/ThemeContext";

const Comment = ({ toggleCommentForm }) => {
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
            {/* {`${
        isDarkMode ? "dark" : "light"
      } flex flex-col items-center justify-center w-full h-full gap-4 py-3 rounded-2xl shadow-md text-center`} */}
            {/* "w-96 bg-white border border-gray-200 rounded-md p-4 hover:border-gray-500 hover:shadow-lg" */}
            <div className="flex justify-center items-center h-screen mt-[-80px]">
                <div
                    className={`${
                        isDarkMode ? "dark" : "light"
                    } flex flex-col gap-4 items-center justify-center bg-neutral-500 bg-neutral-500 rounded-2xl p-4 shadow-md text-left`}
                >
                    {/* text-center text-xl font-semibold py-3 */}
                    <div className="p-3 border-b">
                        <h2 className="text-center text-xl font-semibold py-3">
                            Add Comment
                        </h2>
                    </div>
                    <form className="p-4" onSubmit={onSubmitHandler}>
                        <div className="mb-4">
                            <label
                                className="text-xl font mb-4"
                                htmlFor="question1"
                            >
                                How Can we Help You?
                            </label>
                            <input
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                                type="text"
                                name="question1"
                                id="question1"
                                placeholder="Your Comments"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="text-xl font mb-4"
                                htmlFor="question2"
                            >
                                How Can we Improve
                            </label>
                            <input
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                                type="text"
                                name="question2"
                                id="question2"
                                placeholder="Your Comments"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="text-xl font mb-4"
                                htmlFor="message"
                            >
                                Details
                            </label>
                            <textarea
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                                name="message"
                                id="message"
                                placeholder="Enter your message"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                className="flex cursor-pointer bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600"
                                onClick={toggleCommentForm}
                            >
                                Cancel
                            </button>

                            <button
                                disabled={loading}
                                onClick={onSubmitHandler}
                                className="flex cursor-pointer ml-auto bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                            >
                                {loading ? <SpinnerIcon /> : "Post"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Comment;
