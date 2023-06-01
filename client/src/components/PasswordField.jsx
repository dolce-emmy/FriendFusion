import React, { useState } from "react";
import ShowTogglePasswordIcon from "./icons/ShowTogglePasswordIcon";
import HideTogglePasswordIcon from "./icons/HideTogglePasswordIcon";

export const PasswordField = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input
        className="w-full"
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        placeholder="********"
        value={value}
        onChange={onChange}
      />
      {showPassword ? (
        <button onClick={togglePassword} className="absolute right-3 bottom-2">
          <ShowTogglePasswordIcon />
        </button>
      ) : (
        <button onClick={togglePassword} className="absolute right-3 bottom-2">
          <HideTogglePasswordIcon />
        </button>
      )}
    </div>
  );
};
