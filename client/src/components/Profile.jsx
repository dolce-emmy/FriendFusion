import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import Header from "./Header";
import { useThemeContext } from "../context/ThemeContext";
import SpinnerIcon from "./icons/SpinnerIcon";

const Profile = () => {
  const { isDarkMode } = useThemeContext();
  const { user, setUser } = useAppContext();
  const [loading, setLoading] = useState(false);
  console.log(user);

  const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   location: "",
  //   occupation: "",
  //   mobile: "",
  //   birthDate: "",
  //   profilePicture: ""

  // });

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the change
  //{
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  //   setSubmitted(false);
  // };

  // Handling the form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updateUser = (data) => {
      api
        .patch(`/users/${user._id}`, data)
        .then((res) => {
          console.log(res.data);
          setSubmitted(true);
          setError(false);

          if (res.data.success) {
            setUser(res.data.data);

            navigate("/");
          } else {
            console.log(res.data.message);
          }

          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    };

    const data = new FormData(e.target);
    const file = e.target.file.files[0];
    if (file) {
      const imageData = new FormData();
      imageData.append("file", file, file.name);
      const imgRes = await api.post("/images", imageData);
      if (imgRes.data.success) {
        data.append("image", imgRes.data.data._id);
      }
    }
    updateUser(data);
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {formData.firstName} Profile successfully updated!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter the required fields</h1>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div
        className={`${
          isDarkMode ? "dark" : "light"
        } w-full h-full max-w-4xl mx-auto rounded-md shadow-md p-8 mt-10 relative`}
      >
        <Link
          to="/"
          className={`${
            isDarkMode ? "dark-hover" : "light-hover"
          } absolute left-3 top-3 p-2 rounded-full`}
        >
          <ArrowLeftIcon />
        </Link>

        <h1 className="text-3xl font-bold text-center mb-10">
          Edit Your Profile
        </h1>
        <section>
          <form className="mb-4" onSubmit={handleSubmit} disabled={loading}>
            <div className="flex flex-col items-center gap-4 mb-8">
              <img
                alt={user?.firstName}
                src={user?.image?.url}
                className="shadow-xl rounded-full h-28 w-28 align-middle border-none -m-16 my-0.5 -ml-30 lg:-ml-16 max-w-250-px"
              />
              <label className="flex gap-1 cursor-pointer" htmlFor="image">
                <span>Upload Photo</span>
                <input
                  type="file"
                  id="image"
                  name="file"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold mb-2">
                  First Name
                </label>
                <input
                  name="firstName"
                  defaultValue={user?.firstName}
                  className="w-full"
                  type="text"
                />
              </div>
              <div>
                <label className="label block text-sm font-bold mb-2">
                  Last Name
                </label>
                <input
                  name="lastName"
                  defaultValue={user?.lastName}
                  className="w-full"
                  type="text"
                />
              </div>
              <div>
                <label className="label block text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  name="email"
                  className="w-full"
                  defaultValue={user?.email}
                  type="email"
                />
              </div>
              <div>
                <label className="label block text-sm font-bold mb-2">
                  Occupation
                </label>
                <input
                  name="occupation"
                  placeholder="enter your occupation"
                  defaultValue={user?.occupation}
                  className="w-full"
                  type="text"
                />
              </div>
              <div>
                <label className="label block text-sm font-bold mb-2">
                  Mobile
                </label>
                <input
                  name="mobile"
                  defaultValue={user?.mobile}
                  className="w-full"
                  type="tel"
                />
              </div>
              <div>
                <label className="label block text-sm font-bold mb-2 ">
                  Location
                </label>
                <input
                  name="enter your location"
                  placeholder="location"
                  defaultValue={user?.location}
                  className="w-full"
                  type="text"
                />
              </div>
              <div>
                <label className="label block text-sm font-bold mb-2">
                  Birthday
                </label>
                <input
                  name="birthday"
                  defaultValue={user?.birthday}
                  className="w-full"
                  type="date"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 mt-6">
                {loading ? <SpinnerIcon /> : "Save"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Profile;
