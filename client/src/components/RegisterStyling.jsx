<div className="form">
  <div>
    <h1 className="text-3xl font-bold text-center">Create your account</h1>
  </div>
  <div className="relative">
    <img
      alt="..."
      src={user?.image}
      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
    />
  </div>
  <div className="text-center messages my-3">
    {submitted && (
      <div
        className="flex bg-green-100 rounded-lg p-4 mb-4 max-w-sm text-sm text-green-700 mx-auto"
        role="alert"
      >
        <span className="mr-2">
          <i className="fas fa-light fa-triangle-exclamation"></i>
        </span>
        <div>
          <span className="font-medium">
            User <b>{formData.firstName}</b> successfully registered!!
          </span>
        </div>
      </div>
    )}
    {error && (
      <div
        className="flex bg-yellow-100 rounded-lg p-4 mb-4 max-w-sm text-sm text-yellow-700 mx-auto"
        role="alert"
      >
        <span className="mr-2">
          <i className="fas fa-light fa-triangle-exclamation"></i>
        </span>
        <div>
          <span className="font-medium">Please enter all the fields</span>
        </div>
      </div>
    )}
  </div>
  <div className="w-full h-full max-w-sm mx-auto rounded-md shadow-md bg-neutral-800 p-8">
    <form>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="firstName">
          First Name
        </label>
        <input
          className="w-full px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
          type="text"
          id="firstName"
          name="firstName"
          placeholder="John"
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="w-full px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500"
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Doe"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </div>
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
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <PasswordField value={formData.password} onChange={handleInputChange} />
      </div>
      <button
        className="block w-full bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 mt-6"
        type="submit"
        onClick={handleSubmit}
      >
        Sign up
      </button>
    </form>
    <div className="p-4 border-b border-neutral-700 h-1 w-full" />
    <NavLink
      className="block text-center w-full bg-green-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 mt-6"
      to="/login"
    >
      Login
    </NavLink>
  </div>
</div>;
