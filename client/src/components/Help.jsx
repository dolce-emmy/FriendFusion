import React from "react";
import Header from "./Header.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useThemeContext } from "../context/ThemeContext";

function Help() {
    const { isDarkMode } = useThemeContext();
    return (
        <div>
            <Header />
            <div className="max-w-2xl mx-auto py-8 px-4">
                <h2 className="text-3xl text-center font-bold mb-8">
                    Help Center
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        className={`${
                            isDarkMode ? "dark" : "light"
                        } w-full flex flex-col gap-4 rounded-2xl p-6 shadow-md hover:shadow-lg`}
                    >
                        <h3 className="text-xl font-bold mb-4">
                            How to create an account
                        </h3>
                        <p className="mb-8">
                            To create an account, visit our website and click
                            the "Sign up" button. You'll need to provide your
                            email address, choose a password, and complete any
                            additional fields we require.
                        </p>
                    </div>
                    <div
                        className={`${
                            isDarkMode ? "dark" : "light"
                        } w-full flex flex-col gap-4 rounded-2xl p-6 shadow-md hover:shadow-lg`}
                    >
                        <h3 className="text-xl font-bold mb-4">
                            How to customize your profile
                        </h3>
                        <p className="mb-8">
                            To customize your profile, click on your profile
                            picture in the top right corner of the screen. From
                            there, you can upload a profile picture, add a bio,
                            and choose a cover photo.
                        </p>
                    </div>
                    <div
                        className={`${
                            isDarkMode ? "dark" : "light"
                        } w-full flex flex-col gap-4 rounded-2xl p-6 shadow-md hover:shadow-lg`}
                    >
                        <h3 className="text-xl font-bold mb-4">
                            How to post content
                        </h3>
                        <p className="mb-8">
                            To post content, click on the "Post" button on the
                            homepage. You can post text updates, photos, videos,
                            and links.
                        </p>
                    </div>
                    <div
                        className={`${
                            isDarkMode ? "dark" : "light"
                        } w-full flex flex-col gap-4 rounded-2xl p-6 shadow-md hover:shadow-lg`}
                    >
                        <h3 className="text-xl font-bold mb-4">
                            How to connect with other users
                        </h3>
                        <p className="mb-8">
                            To connect with other users, you can follow them,
                            send friend requests, and join groups or
                            communities. You can search for other users by name
                            or by using our search bar.
                        </p>
                    </div>
                    <div
                        className={`${
                            isDarkMode ? "dark" : "light"
                        } w-full flex flex-col gap-4 rounded-2xl p-6 shadow-md hover:shadow-lg`}
                    >
                        <h3 className="text-xl font-bold mb-4">
                            How to adjust privacy settings
                        </h3>
                        <p className="mb-8">
                            To adjust your privacy settings, click on the
                            "Settings" button on your profile page. From there,
                            you can control who can see your posts and profile
                            information, and how to block or report other users.
                        </p>
                    </div>

                    <div
                        className={`${
                            isDarkMode ? "dark" : "light"
                        } w-full flex flex-col gap-4 rounded-2xl p-6 shadow-md hover:shadow-lg`}
                    >
                        <h3 className="text-xl font-bold mb-4">
                            Frequently Asked Questions (FAQs)
                        </h3>
                        <ul className="list-disc list-inside mb-8 ml-4">
                            <li>How do I delete my account?</li>
                            <li>How do I change my password?</li>
                            <li>How do I retrieve a forgotten username?</li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <Link
                        to="/"
                        className="flex cursor-pointer bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Help;
