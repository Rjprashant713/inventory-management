import React, { useState } from "react";
import "../Styles/Styles.css";
import fetch from 'isomorphic-fetch';
import { useHistory } from 'react-router';
import { Cookies } from "react-cookie";

const Login = () => {
    const history = useHistory();
    const cookie = new Cookies();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    cookie.set("authToken",encodedAuthString);

    history.push('/');
}

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
      const authString = '14c4d2a7f39d02b467158d2b06c0134f::bd11fec9d0805f8cb49f87c5361974bd::3ifSeJUaKxVb41QJV6QXNA==';
      const encodedAuthString = btoa(`${username}:${authString}`);

      try {
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
          alert('You have successfully logged in to Nimesa');
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
      }
    }
  };

  return (
    <div className="login-form">
      <div className="container">
        <img src="/images/nimesa-logo.png" alt="Nimesa Logo" className="logo" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;