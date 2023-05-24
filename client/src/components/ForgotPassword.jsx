import React from "react";
import { NavLink } from "react-router-dom";
import bgImage from "../bg.png";
import ForgotPasswordIcon from "./icons/ForgotPasswordIcon";

const ForgotPassword = () => {
  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-screen h-screen">
      <div className="bg-neutral-800 text-neutral-100 w-full h-full overflow-hidden">
        <div className="md:flex w-full">
          <div
            className="hidden md:block w-1/2 bg-indigo-600 p-10 absolute left-0 inset-y-0"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <ForgotPasswordIcon />
          </div>
          <div className="w-full md:w-1/2 py-10 mx-auto flex flex-col gap-4 justify-center items-center absolute right-0 inset-y-0">
            <div className="px-8 lg:px-2">
              <div className="my-6">
                <h1 className="text-3xl font-bold text-center">
                  Forgot Password
                </h1>
                <p className="text-center">
                  Please enter your email to recover the password
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
                    className="w-full px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <input
                  className="block w-full bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 mt-6"
                  type="submit"
                  value="Reset Password"
                />
              </form>
              <div className="p-4 border-b border-neutral-700 h-1 w-full" />
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
