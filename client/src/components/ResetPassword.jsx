import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ForgotPasswordIcon from "./icons/ForgotPasswordIcon";
import { useThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

const ResetPassword = () => {
  const { isDarkMode } = useThemeContext();
  const location = useLocation();
  const resetToken = new URLSearchParams(location.search).get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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

      const response = await fetch("/api/users/reset-password", {
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
            className={`hidden lg:block bg-gradient w-1/2 absolute left-0 inset-y-0`}
          >
            <span className="block bg-[url('./bg.png')] absolute object-cover object-center w-full h-full -z-1"></span>
            <span className="block z-10 absolute left-0 inset-y-0 px-10">
              <ForgotPasswordIcon />
            </span>
          </div>
          <div className="w-full lg:w-1/2 py-10 mx-auto flex flex-col gap-4 justify-center items-center absolute right-0 inset-y-0">
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
                    className="w-full"
                    type={showPassword ? "text" : "password"}
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
                    className="w-full"
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={showPassword}
                      onChange={toggleShowPassword}
                    />
                    Show Password
                  </label>
                </div>

                <button className="btn w-full mt-6" type="submit">
                  Reset Password
                </button>
                <Link
                  to="/login"
                  target="_blank"
                  className={`${
                    isDarkMode ? "dark-hover" : "light-hover"
                  } absolute left-3 top-3 p-2 rounded-full`}
                >
                  <ArrowLeftIcon />
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
