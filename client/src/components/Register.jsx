import { useState } from "react";

const Register = () => {
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
      setSubmitted(true);
      setError(false);
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
        <h1>User {formData.firstName} successfully registered!!</h1>
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
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h1>User Registration</h1>
      </div>
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
      <form>
        <label className="label">First Name</label>
        <input
          name="firstName"
          onChange={handleInputChange}
          className="input"
          value={formData.firstName}
          type="text"
        />
        <br />
        <br />
        <label className="label">Last Name</label>
        <input
          name="lastName"
          onChange={handleInputChange}
          className="input"
          value={formData.lastName}
          type="text"
        />
        <br />
        <br />
        <label className="label">Email</label>
        <input
          name="email"
          onChange={handleInputChange}
          className="input"
          value={formData.email}
          type="email"
        />
        <br />
        <br />
        <label className="label">Password</label>
        <input
          name="password"
          onChange={handleInputChange}
          className="input"
          value={formData.password}
          type="password"
        />
        <br />
        <br />
        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
