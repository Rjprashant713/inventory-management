import React from 'react';

const WelcomeUser = () => {
  const firstName = localStorage.getItem("firstName") || "";
  const lastName = localStorage.getItem("lastName") || ""; 
  return (
    <div className="welcome-user">
      <h1>{`Hello ${firstName} ${lastName}!`}</h1>
    </div>
  );
};

export default WelcomeUser;
