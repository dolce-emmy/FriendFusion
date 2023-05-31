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
              {/* <img src="./logo.svg" className="w-20 h-20" /> */}
              <LogoIcon />
              <span className="text-xl font-semibold">Friend Fusion</span>
            </Link>
          </h1>
          <div className="relative ml-10">
            <form onSubmit={handleSearch} className="ml-5">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search"
                  className={`px-3 py-2 border rounded-full focus:outline-none focus:border-indigo-500 shadow-md ${
                    isDarkMode ? "dark dark-border" : "light light-border"
                  }`}
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
          {isDarkMode ? (
            <MoonIcon onClick={toggleDarkMode} />
          ) : (
            <SunIcon onClick={toggleDarkMode} />
          )}

          <Link to="/comments">
            <CommentIcon />
          </Link>
          <Link to="/alerts">
            <AlertIcon />
          </Link>
          <Link to="/help">
            <HelpIcon />
          </Link>
          <span>Welcome {user?.firstName}</span>
          <button onClick={handleLogout}>
            <LogoutIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
