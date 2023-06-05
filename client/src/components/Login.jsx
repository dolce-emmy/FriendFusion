import api from "../api";
import { useAppContext } from "../context/AppContext";
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { PasswordField } from "./PasswordField";
import LoginIcon from "./icons/LoginIcon";
import { useThemeContext } from "../context/ThemeContext";
import SpinnerIcon from "./icons/SpinnerIcon";

function Login() {
  const { isDarkMode } = useThemeContext();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useAppContext();

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    api
      .post(
        "/users/login",
        JSON.stringify({
          email: event.target.email.value,
          password: event.target.password.value,
        }),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          console.log(res.data);
          const token = res.headers.token;

          console.log({ token });
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          setUser(res.data.data);
          navigate("/");
        } else {
          setMessage(res.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setLoading(false);
      });
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
              <LoginIcon />
            </span>
          </div>
          <div className="w-full lg:w-1/2 py-10 mx-auto flex flex-col gap-4 justify-center items-center absolute right-0 inset-y-0">
            <div className="px-8 lg:px-2">
              <h1 className="text-3xl font-bold text-center mb-10">
                Hello, you
              </h1>
              {message && (
                <div
                  className="my-3 flex justify-center bg-yellow-100 rounded-lg p-4 mb-4 max-w-md text-sm text-yellow-700 mx-auto"
                  role="alert"
                >
                  <span className="mr-2">
                    <i className="fas fa-light fa-triangle-exclamation"></i>
                  </span>
                  <span className="font-medium">{message}</span>
                </div>
              )}
              <form onSubmit={handleLoginSubmit} disabled={loading}>
                <div className="flex gap-4 mb-4">
                  <div>
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
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <div>
                    <PasswordField
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                </div>
                <button className="btn w-full mt-6" type="submit">
                  {loading ? <SpinnerIcon /> : "Login"}
                </button>
              </form>
              <NavLink
                className="text-xs text-neutral-500 hover:text-neutral-400"
                to="/forgot-password"
              >
                Forgot Password?
              </NavLink>
              <div
                className={`${
                  isDarkMode ? "dark-border" : "light-border"
                } p-4 border-b h-1 w-full`}
              />
              <NavLink
                className="block text-center w-full bg-green-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 mt-6"
                to="/register"
              >
                Register
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
