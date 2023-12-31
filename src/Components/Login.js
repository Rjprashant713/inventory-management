import React, { useState } from "react";
import "../Styles/Styles.css";
import fetch from 'isomorphic-fetch';
import { useHistory } from 'react-router';
import { AccountCircle, Lock } from '@material-ui/icons';

const Login = () => {
    const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

// Storing UserDetails in Local Storage
const handleUserDetails =(responseData,encodedAuthString)=>{
    localStorage.setItem("firstName",responseData?.firstName);
    localStorage.setItem("lastName",responseData?.lastName);
    localStorage.setItem("userName",responseData?.userName);
    localStorage.setItem("userRole",responseData?.roleName);
    localStorage.setItem("UserEmail",responseData?.emailId);
    localStorage.setItem("isLoggedIn",true);
    localStorage.setItem("authToken",encodedAuthString);

    history.push('/');
}
const toggleShowPassword = () => {
  setShowPassword(!showPassword);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (name.trim() === '' && password.trim() === ''){
        setErrorMessage('Please enter valid fields.');
        return;
    }
    if (name.trim() === '') {
      setErrorMessage('Please enter your name.');
    } else if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters long.');
    } else {
      const username = name; //'nimesa'
      const authString = password;
      const encodedAuthString = btoa(`${username}:${authString}`);
      try {
        setLoading(true);
        const response = await fetch('/home/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${encodedAuthString}`,
          },
          body: JSON.stringify({}),
        });

        if (response.ok) {
          // Handle successful API call
          const responseData = await response.json();
          // console.log('data=', responseData);
          handleUserDetails(responseData,encodedAuthString)
         
          setErrorMessage('');
          // Reset form fields
          setName('');
          setPassword('');
        } else {
          // Handle API call error
          const data = await response.json();
          setErrorMessage(data.error || 'Something went wrong.');
        }
      } catch (error) {
        // Handle fetch error
        console.log(error);
        setErrorMessage('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }   
    }
  };

  return (
    <div className="login-form">
      <div className="container">
        <img src="/images/nimesa-logo.png" alt="Nimesa Logo" className="logo" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <div className="input-with-icon1">
              <AccountCircle className="input-icon" />
              <input type="text" id="name" value={name} onChange={handleNameChange} placeholder="Username" />
            </div>
          </div>
          <div className="form-group1">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon"> 
            <Lock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
            <div
              className={`password-toggle-icon ${showPassword ? 'visible' : ''}`}
              onClick={toggleShowPassword}
            >
                {showPassword ? (
                      <img src="/images/crossed_eye.svg" alt="" />
                    ) : (
                      <img src="/images/show-pass-eye-icon.svg" alt="" />
                    )}
              </div>
            </div>
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit" className="signIn-btn" disabled={loading}>
            {loading ?  <div className="loader-sign" /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;