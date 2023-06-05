import { useState } from "react";
import api from "../api";
import { NavLink, useNavigate } from "react-router-dom";
import { PasswordField } from "./PasswordField";
import RegisterIcon from "./icons/RegisterIcon";
import { useThemeContext } from "../context/ThemeContext";

const Register = () => {
  const { isDarkMode } = useThemeContext();
  const navigate = useNavigate();
  // State for registration form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      setError(true);
    } else {
      api
        .post("/users/register", JSON.stringify(formData), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            setSubmitted(true);
            setError(false);
            navigate("/login");
          } else {
            setError(true);
            setSubmitted(false);
          }
        })
        .catch((err) => {
          setError(true);
        });
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
              <RegisterIcon />
            </span>
          </div>
          <div className="w-full lg:w-1/2 py-10 mx-auto flex flex-col gap-4 justify-center items-center absolute right-0 inset-y-0">
            <h1 className="text-3xl font-bold text-center mb-10">
              Create your account
            </h1>
            {submitted && (
              <div
                className="my-3 flex justify-center bg-green-100 rounded-lg p-4 mb-4 max-w-md text-sm text-green-700 mx-auto"
                role="alert"
              >
                <span className="mr-2">
                  <i className="fas fa-light fa-triangle-exclamation"></i>
                </span>
                <span className="font-medium">
                  User <b>{formData.firstName}</b> successfully registered!!
                </span>
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
                <span className="font-medium">
                  Please enter valid information
                </span>
              </div>
            )}
            <div className="px-8 lg:px-2">
              <form>
                <div className="flex gap-4 mb-4">
                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      className="w-full"
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      className="w-full"
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
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
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <PasswordField
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button
                  className="btn block w-full mt-6"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </form>
              <div
                className={`${
                  isDarkMode ? "dark-border" : "light-border"
                } p-4 border-b h-1 w-full`}
              />
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

export default Register;



