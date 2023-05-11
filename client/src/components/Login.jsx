import api from "../api";
import { useAppContext } from "../context/AppContext";
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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
          prompt(res.data.message);
        }
      });
  };

  const handleForgotPasswordSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="">
      {!showForgotPassword ? (
        <>
          <h1 className="text-3xl font-bold text-center mb-6">Hello, you!</h1>
          {message && <div>{message}</div>}
          <div className="w-full h-full max-w-sm mx-auto rounded-md shadow-md bg-neutral-800 p-8">
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
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
              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="********"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <input
                className="block w-full bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 mt-6"
                type="submit"
                value="Sign in"
              />
              <button
                className="text-sm my-2 text-neutral-300 hover:text-neutral-100"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </button>
            </form>
            <div className="p-4 border-b border-neutral-700 h-1 w-full" />
            <NavLink
              className="block text-center w-full bg-green-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 mt-6"
              to="/register"
            >
              Register
            </NavLink>
          </div>
        </>
      ) : (
        <div className="forget-container max-w-sm mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">
            Forgot Password
          </h1>
          <p className="text-center my-3">
            Please enter your email to recover the password
          </p>
          <div className="w-full h-full max-w-sm mx-auto rounded-md shadow-md bg-neutral-800 p-8">
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
