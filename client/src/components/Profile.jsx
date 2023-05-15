import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useAppContext();
  console.log (user)

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
    <div>
      <form onSubmit={handleSubmit}>
        <label className="label">First Name</label>
        <input
          name="firstName"
          defaultValue={user?.firstName}
          // onChange={handleInputChange}
          className="input"
          //value={user?.firstName}
          type="text"
        />
        <br />
        <br />
        <label className="label">Last Name</label>
        <input
          name="lastName"
          defaultValue={user?.lastName}
          // onChange={handleInputChange}
          className="input"
          //value={user?.lastName}
          type="text"
        />
        <br />
        <br />
        <label className="label">Email</label>
        <input
          name="email"
          // onChange={handleInputChange}
          className="input"
          defaultValue={user?.email}
          //value={user?.email}
          type="email"
        />
        <br />

        <br />

        <label className="label">Occupation</label>
        <input
          name="occupation"
          defaultValue={user?.occupation}
          // onChange={handleInputChange}
          className="input"
          //value={user?.occupation}
          type="text"
        />

        <br />
        <br />
        <label className="label">mobile</label>
        <input
          name="mobile"
          defaultValue={user?.mobile}
          // onChange={handleInputChange}
          className="input"
          //value={user?.mobile}
          type="tel"
        />
        <br />
        <br />

        <label className="label">Location</label>
        <input
          name="location"
          defaultValue={user?.location}
          // onChange={handleInputChange}
          className="input"
          //value={user?.location}
          type="text"
        />

        <br />
        <br />

        <label className="label">Birthday</label>
        <input
          name="birthday"
          defaultValue={user?.birthday}
          // onChange={handleInputChange}
          className="input"
          //value={user?.birthday}
          type="date"
        />
        <br />
        <br />

        <label className="label">Profile Picture</label>
        <input
          name="file"
          // onChange={handleInputChange}
          className="input"
          //value={user?.picturePath}
          type="file"
        />

        <br />
        <br />

        <button className="btn">Submit</button>
      </form>
      
      <Link to="/">go back to homepage</Link>
    </div>
    
  );
};

export default Profile;
