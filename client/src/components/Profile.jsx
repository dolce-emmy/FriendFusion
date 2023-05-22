import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import ArrowHomePageIcon from "./icons/ArrowHomePageIcon";

const Profile = () => {
  const { user, setUser } = useAppContext();
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

  // Handling the input change
  // const handleInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  //   setSubmitted(false);
  // };

  // Handling the form submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const file = e.target.file.files[0];
    formData.append("file", file, file.name);

    const imgRes = await api.post("/images", formData);
    if (imgRes.data.success) {
      const data = new FormData(e.target);
      data.append("image", imgRes.data.data._id);
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
        })
        .catch((err) => {
          setError(true);
        });
    }
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
    <div className="w-full h-full max-w-sm mx-auto rounded-md shadow-md bg-neutral-800 p-8">
      <div>
        <h1 className="text-3xl font-bold text-center">Edit Your Profile</h1>
      </div>
      <br />

      <div
        className="flex justify-center items-center"
      >
        <img
          alt="..."
          src={user?.image.url}
          className="shadow-xl rounded-full h-20 w-20 align-middle border-none  -m-16 my-0.5  -ml-30 lg:-ml-16 max-w-250-px"
        />
      </div>
      <br />
      <form className="mb-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-bold mb-2">First Name</label>
        <input
          name="firstName"
          defaultValue={user?.firstName}
          // onChange={handleInputChange}
          className="input w-full px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
          //value={user?.firstName}
          type="text"
        />
        <br />
        <br />
        <label className="label block text-sm font-bold mb-2">Last Name</label>
        <input
          name="lastName"
          defaultValue={user?.lastName}
          // onChange={handleInputChange}
          className="input w-full px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
          //value={user?.lastName}
          type="text"
        />
        <br />
        <br />
        <label className="label block text-sm font-bold mb-2">Email</label>
        <input
          name="email"
          // onChange={handleInputChange}
          className="input w-full px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
          defaultValue={user?.email}
          //value={user?.email}
          type="email"
        />
        <br />

        <br />

        <label className="label block text-sm font-bold mb-2">Occupation</label>
        <input
          name="occupation"
          defaultValue={user?.occupation}
          // onChange={handleInputChange}
          className="input w-full px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
          //value={user?.occupation}
          type="text"
        />

        <br />
        <br />
        <label className="label block text-sm font-bold mb-2">mobile</label>
        <input
          name="mobile"
          defaultValue={user?.mobile}
          // onChange={handleInputChange}
          className="input w-full px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
          //value={user?.mobile}
          type="tel"
        />
        <br />
        <br />

        <label className="label block text-sm font-bold mb-2 ">Location</label>
        <input
          name="location"
          defaultValue={user?.location}
          // onChange={handleInputChange}
          className="input w-full px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
          //value={user?.location}
          type="text"
        />

        <br />
        <br />

        <label className="label block text-sm font-bold mb-2">Birthday</label>
        <input
          name="birthday"
          defaultValue={user?.birthday}
          // onChange={handleInputChange}
          className="input w-full px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
          //value={user?.birthday}
          type="date"
        />
        <br />
        <br />

        <label className="label block text-sm font-bold mb-2">
          Profile Picture
        </label>
        <input
          name="file"
          // onChange={handleInputChange}
          className="input w-full px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
          //value={user?.picturePath}
          type="file"
        />

        <br />
        <br />

        <button className="btn block w-full bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 mt-6">
          Submit
        </button>
      </form>
      <button className="btn block w-full bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 mt-6">
      <Link to="/" className=" flex content-between justify-center">

        HomePage <ArrowHomePageIcon/>
        
      </Link>
      </button>
      
    </div>
  );
};

export default Profile;
