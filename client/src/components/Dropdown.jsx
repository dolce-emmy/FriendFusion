import React, { useState } from "react";
import { useThemeContext } from "../context/ThemeContext";

const Dropdown = ({ className, Icon, icon, label, children }) => {
  const { isDarkMode } = useThemeContext();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`${isDarkMode ? "dark" : "light"} p-1 rounded-full ${
          open ? (isDarkMode ? "dark-hover" : "light-hover") : ""
        } ${className}`}
      >
        <div className="flex gap-1 items-center">
          {label && <span className="ml-2 hidden lg:block">{label}</span>}
          {Icon && <Icon />}
          {icon}
        </div>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 h-full w-full z-10"
        ></div>
      )}
      <div
        className={`${isDarkMode ? "dark-hover" : "light-hover"} ${
          open
            ? "opacity-1 visible translate-y-0 scale-100"
            : "opacity-0 invisible"
        } absolute right-4 top-14 mt-2 rounded-md overflow-hidden shadow-xs z-20 transition-all duration-300 transform origin-top-right -translate-y-2 scale-95`}
      >
        {children}
      </div>
    </>
  );
};

export default Dropdown;
