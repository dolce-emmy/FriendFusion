import React from "react";
import { NavLink } from "react-router-dom";
import bgImage from "../bg.png";
import { useState } from "react";
import ForgotPasswordIcon from "./icons/ForgotPasswordIcon";
import { useThemeContext } from "../context/ThemeContext";

const ForgotPassword = () => {
    const { isDarkMode } = useThemeContext();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Please enter your email");
            return;
        }

        try {
            setIsLoading(true);
            setError("");
            setSuccessMessage("");

            const response = await fetch("/api/users/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            setIsLoading(false);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setSuccessMessage("Password reset email sent");
                setEmail("");
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (error) {
            setIsLoading(false);
            setError("An error occurred. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="w-screen h-screen">
            <div
                className={`${
                    isDarkMode ? "dark" : "light"
                } w-full h-full overflow-hidden`}
            >
                <div className="md:flex w-full">
                    <div
                        className="hidden md:block w-1/2 bg-indigo-600 p-10 absolute left-0 inset-y-0"
                        style={{ backgroundImage: `url(${bgImage})` }}
                    >
                        <ForgotPasswordIcon />
                    </div>
                    <div className="w-full md:w-1/2 py-10 mx-auto flex flex-col gap-4 justify-center items-center absolute right-0 inset-y-0">
                        <div className="px-8 lg:px-2">
                            <div className="my-10">
                                <h1 className="text-3xl font-bold text-center">
                                    Forgot Password
                                </h1>
                                <p className="text-center">
                                    Please enter your email to recover the
                                    password
                                </p>
                            </div>
                            <form onSubmit={handleForgotPasswordSubmit}>
                                <div className="mb-4">
                                    <label
                                        className="block text-sm font-bold mb-2"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        className="w-full"
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="john.doe@example.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                {error && (
                                    <p className="text-red-500">{error}</p>
                                )}
                                {successMessage && (
                                    <p className="text-green-500">
                                        {successMessage}
                                    </p>
                                )}
                                <button
                                    className="block w-full bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 mt-6"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "Loading..."
                                        : "Reset Password"}
                                </button>
                            </form>
                            <div
                                className={`${
                                    isDarkMode ? "dark-border" : "light-border"
                                } p-4 border-b h-1 w-full`}
                            />
                            <NavLink
                                className="block text-center w-full bg-green-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 mt-6"
                                to="/login"
                            >
                                Login
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
