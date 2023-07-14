import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/helper";

const Navbar = ({ lastInactiveTime }) => {
  const [userName] = useState(localStorage.getItem("userName") || "Guest");
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;
    if (lastInactiveTime) {
      const startTime = performance.now();
      setElapsedTime(0);
      timer = setInterval(() => {
        const currentTime = performance.now();
        const elapsed = Math.floor(currentTime - startTime);
        setElapsedTime(elapsed);
      }, 1000);
    }

    const resetTimer = () => {
      clearInterval(timer);
      setElapsedTime(0);
      timer = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
      }, 1000);
    };

    const activityEvents = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    activityEvents.forEach((event) => {
      document.addEventListener(event, resetTimer);
    });

    return () => {
      clearInterval(timer);
      activityEvents.forEach((event) => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [lastInactiveTime]);

  const formatElapsedTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const getSecondsTimer = (elapsedTime) => {
    return Math.floor((elapsedTime % 60000) / 1000);
  };

  function toggleUserActions() {
    const userActions = document.getElementById("userActions");
    if (userActions) {
      userActions.style.display =
        userActions.style.display === "none" ? "block" : "none";
    }
  }

  document.addEventListener("click", function (event) {
    const userToggle = document.getElementById("userToggle");
    const userActions = document.getElementById("userActions");

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
          {lastInactiveTime && getSecondsTimer(elapsedTime) > 2 ? (
            <div className="inactive-timer">
              Idle for: {formatElapsedTime(elapsedTime)}
            </div>
          ) : (
            <div className="active-timer">You are active now.</div>
          )}
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
