import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import api from "../api";
import UserBasicInfo from "./UserBasicInfo";
import CommentIcon from "./icons/CommentIcon";
import AlertIcon from "./icons/AlertIcon";
import HelpIcon from "./icons/HelpIcon";
import LogoutIcon from "./icons/LogoutIcon";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";
import SearchIcon from "./icons/SearchIcon";
import LogoIcon from "./icons/LogoIcon";
import { useThemeContext } from "../context/ThemeContext";
import Dropdown from "./Dropdown";
import ProfileIcon from "./icons/ProfileIcon";

const Header = () => {
  const { user } = useAppContext();
  const { isDarkMode, toggleDarkMode } = useThemeContext();
  const [showSearchedUsers, setShowSearchedUsers] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    // Handle search functionality here
    const query = event.target.search.value;

    const formData = new FormData();
    formData.append("query", query);

    // Filter the user list based on the search query
    api
      .post("/users/search", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setSearchedUsers(res.data.data);
        setShowSearchedUsers(true);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <header className={`${isDarkMode ? "dark" : "light"} shadow-md p-5`}>
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1>
            <Link to="/" className="flex items-center gap-2">
              <LogoIcon />
              <span className="text-xl font-semibold hidden sm:block">
                Friend Fusion
              </span>
            </Link>
          </h1>
          <div className="relative sm:ml-10">
            <form onSubmit={handleSearch} className="ml-5">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search"
                  className={"!rounded-full"}
                />
                <button
                  type="submit"
                  className={`absolute right-0.5 top-0.5 p-1.5 text-center rounded-full transition-all duration-300 ${
                    isDarkMode ? "dark-hover" : "light-hover"
                  }`}
                >
                  <SearchIcon />
                </button>
              </div>
            </form>
            {showSearchedUsers && (
              <div
                onClick={() => setShowSearchedUsers(false)}
                className="fixed inset-0 h-full w-full z-10"
              ></div>
            )}
            <div
              className={`${isDarkMode ? "dark" : "light"} ${
                showSearchedUsers
                  ? "opacity-1 visible translate-y-0 scale-100"
                  : "opacity-0 invisible"
              } absolute right-0 mt-2 py-2 w-72 flex flex-col rounded-md shadow-md z-20 transition-all duration-300 transform origin-top-right -translate-y-2 scale-95`}
            >
              {searchedUsers?.map((searchedUser) => (
                <div key={searchedUser._id} className="px-4 py-2">
                  <UserBasicInfo
                    handleOnClick={() => setShowSearchedUsers(false)}
                    user={searchedUser}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dropdown
            icon={<ProfileIcon className="w-8 h-8" />}
            label={`Welcome, ${user?.firstName}!`}
          >
            {!isDarkMode ? (
              <button
                className={`${
                  isDarkMode ? "dark-hover" : "light-hover"
                } menu-item`}
                onClick={toggleDarkMode}
              >
                <MoonIcon />
                <span>Dark Theme</span>
              </button>
            ) : (
              <button
                className={`${
                  isDarkMode ? "dark-hover" : "light-hover"
                } menu-item`}
                onClick={toggleDarkMode}
              >
                <SunIcon />
                <span>Light Theme</span>
              </button>
            )}

            <Link
              className={`${
                isDarkMode ? "dark-hover" : "light-hover"
              } menu-item`}
              to="/alerts"
            >
              <AlertIcon />
              <span>Alerts</span>
            </Link>
            <Link
              className={`${
                isDarkMode ? "dark-hover" : "light-hover"
              } menu-item`}
              to="/help"
            >
              <HelpIcon />
              <span>Help</span>
            </Link>
            <Link
              className={`${
                isDarkMode ? "dark-hover" : "light-hover"
              } menu-item`}
              to="/feedback"
            >
              <CommentIcon />
              <span>Feedback</span>
            </Link>
            <button
              className={`${
                isDarkMode ? "dark-hover" : "light-hover"
              } menu-item`}
              onClick={handleLogout}
            >
              <LogoutIcon />
              <span>Logout</span>
            </button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
