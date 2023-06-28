import React, { useState } from "react";

import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from "../utils/helper";

const Navbar = () => {
  const [userName] = useState(localStorage.getItem("userName") || "Guest");

  function toggleUserActions() {
    var userActions = document.getElementById("userActions");
    if (userActions) {
      userActions.style.display =
        userActions.style.display === "none" ? "block" : "none";
    }
  }

  document.addEventListener("click", function (event) {
    var userToggle = document.getElementById("userToggle");
    var userActions = document.getElementById("userActions");

    if (
      userToggle &&
      userActions &&
      !userToggle.contains(event.target) &&
      !userActions.contains(event.target)
    ) {
      userActions.style.display = "none";
    }
  });

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <Link to= "/">
          <img src="/images/nimesa-logo.png" alt="Nimesa Logo" />
          </Link>
        </div>

        <div className="dropdown">
          <button
            className="dropdown-toggle"
            onClick={toggleUserActions}
            id="userToggle"
          >
            <img src="/images/profile.png" alt="profile pic" />
            <span className="name-text d-none d-md-inline-block">
              {capitalizeFirstLetter(userName)}
            </span>
          </button>
          <div
            className="dropdown-menu"
            id="userActions"
            style={{ display: "none" }}
          >
            <Link className="dropdown-item text-danger" to="/logout">
              <i className="material-icons text-danger">&#xE879;</i> Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
