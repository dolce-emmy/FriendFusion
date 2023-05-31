import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import bgImage from "../bg.png";
import ForgotPasswordIcon from "./icons/ForgotPasswordIcon";
import { useThemeContext } from "../context/ThemeContext";

const ResetPassword = () => {
  const { isDarkMode } = useThemeContext();
  const location = useLocation();
  const resetToken = new URLSearchParams(location.search).get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      setError("");
      setSuccessMessage("");

      const response = await fetch("/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: resetToken, password }),
      });

      if (response.ok) {
        setSuccessMessage("Password reset successful");
        setPassword("");
        setConfirmPassword("");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
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
            <div className="my-10">
              <h1 className="text-3xl font-bold text-center">Reset Password</h1>
              <p className="text-center">
                Please set your password to recover the account
              </p>
            </div>
            <div className="messages my-3">
              {successMessage && (
                <div
                  className="flex justify-center bg-green-100 rounded-lg p-4 mb-4 max-w-md text-sm text-green-700 mx-auto"
                  role="alert"
                >
                  <span className="mr-2">
                    <i className="fas fa-light fa-triangle-exclamation"></i>
                  </span>
                  <span className="font-medium">{successMessage}</span>
                </div>
              )}
              {error && (
                <div
                  className="flex justify-center bg-yellow-100 rounded-lg p-4 mb-4 max-w-md text-sm text-yellow-700 mx-auto"
                  role="alert"
                >
                  <span className="mr-2">
                    <i className="fas fa-light fa-triangle-exclamation"></i>
                  </span>
                  <span className="font-medium">{error}</span>
                </div>
              )}
            </div>
            <div className="px-8 lg:px-2">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    New Password
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>

                <button
                  className="block w-full bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 mt-6"
                  type="submit"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
