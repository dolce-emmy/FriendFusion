import api from "../api";
import { useAppContext } from "../context/AppContext";
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { PasswordField } from "./PasswordField";
import bgImage from "../bg.png";
import LoginIcon from "./icons/LoginIcon";

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { setUser } = useAppContext();

  const handleLoginSubmit = (event) => {
    event.preventDefault();

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
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  return (
    <div className="w-screen h-screen">
      <div className="bg-neutral-800 text-neutral-100 w-full h-full overflow-hidden">
        <div className="md:flex w-full">
          <div
            className="hidden md:block w-1/2 bg-indigo-600 p-10 absolute left-0 inset-y-0"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <LoginIcon />
          </div>
          <div className="w-full md:w-1/2 py-10 mx-auto flex flex-col gap-4 justify-center items-center absolute right-0 inset-y-0">
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
              <form onSubmit={handleLoginSubmit}>
                <div className="flex gap-4 mb-4">
                  <div>
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
                <input
                  className="cursor-pointer block w-full bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 mt-6"
                  type="submit"
                  value="Login"
                />
              </form>
              <NavLink
                className="text-xs text-neutral-300 hover:text-neutral-100"
                to="/forgot-password"
              >
                Forgot Password?
              </NavLink>
              <div className="p-4 border-b border-neutral-700 h-1 w-full" />
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
