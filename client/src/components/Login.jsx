import React from 'react';
import { useState } from 'react';
// import { MyContext } from '../context/ContextContainer';
function Login() {
 const [username, setUsername] = useState('');
//   const { username, setUsername } = useContext(MyContext);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (username !== ' ' && password.length >= 6) {
      setMessage(`you have logged in successfully ${username}`);
    } else {
      setMessage(
        'You have entered a wrong username or password. Please try again.'
      );
    }
  };

  const handleForgotPasswordSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className='contact-container'>
      {!showForgotPassword ? (
        <>
          <h2>Log in</h2>
          <form onSubmit={handleLoginSubmit}>
            {/* <label htmlFor='username'>Username:</label> */}
            <br />
            <input
              placeholder='Username'
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <br />
            <br />
            {/* <label htmlFor='password'>Password:</label> */}
            <br />
            <input
              placeholder='Password'
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <br />
            <input type='submit' value='Log in' />
            {message && <div>{message}</div>}
            <br />
            <br />
            <a href='#' onClick={() => setShowForgotPassword(true)}>
              Forgot Password
            </a>
          </form>
        </>
      ) : (
        <div className='forget-container'>
          <h2>Forgot Password</h2>
          <p>Please enter your account email to recover your password</p>
          <form onSubmit={handleForgotPasswordSubmit}>
            <label htmlFor='email'>Email: </label>
            <input type='email' id='email' name='email' />
            <br />
            <br />
            <input
              className='submit-button'
              type='submit'
              value='Submit Request'
            />
          </form>
        </div>
      )}
    </div>
  );
}
export default Login;
