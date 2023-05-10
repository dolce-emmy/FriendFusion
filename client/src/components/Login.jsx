import api from "../api";
import { useAppContext } from "../context/AppContext";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const {setUser} = useAppContext();

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    api.post('/users/login', JSON.stringify({ email: event.target.email.value, password: event.target.password.value }),{headers: {"Content-Type": "application/json"}})
      .then((res) => {
        console.log(res);
        if(res.data.success){
          console.log(res.data);
          const token = res.headers.token;
          console.log({token})
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(res.data.data));
          setUser(res.data.data);
          navigate('/');
        } else {
          prompt(res.data.message);
        }
      });
  };

  const handleForgotPasswordSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className='contact-container text-blue-500 hover:text-green-500 font-roboto bg-navyBlue'>
      {!showForgotPassword ? (
        <>
          <h2>Log in</h2>
          <form onSubmit={handleLoginSubmit}>
            {/* <label htmlFor='username'>Username:</label> */}
            <br />
            <input
              placeholder='email'
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
