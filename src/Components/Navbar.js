import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/helper";

const Navbar = ({ lastInactiveTime }) => {
  const [userName] = useState(localStorage.getItem("userName") || "Guest");
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);



  useEffect(() => {
    if (lastInactiveTime) {
      const startTime = performance.now();
      setElapsedTime(0);

      // Clear the existing timer if it exists
      clearInterval(timer);

      // Start a new timer
      const newTimer = setInterval(() => {
        const currentTime = performance.now();
        const elapsed = Math.floor(currentTime - startTime);
        setElapsedTime(elapsed);
      }, 1000);

      setTimer(newTimer);

      return () => {
        clearInterval(newTimer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastInactiveTime]);

  useEffect(() => {
    // Reset the timer and elapsed time when the user becomes active
    const resetTimer = () => {
      clearInterval(timer);
      setElapsedTime(0);
      setTimer(setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
      }, 1000));
    };

    // Add event listeners for user activity to reset the timer
    document.addEventListener("mousedown", resetTimer);
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keypress", resetTimer);
    document.addEventListener("scroll", resetTimer);
    document.addEventListener("touchstart", resetTimer);

    return () => {
      document.removeEventListener("mousedown", resetTimer);
      document.removeEventListener("mousemove", resetTimer);
      document.removeEventListener("keypress", resetTimer);
      document.removeEventListener("scroll", resetTimer);
      document.removeEventListener("touchstart", resetTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Format the elapsed time as a string
  const formatElapsedTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const getSecondsTimer = (elapsedTime) => {
    return Math.floor((elapsedTime % 60000) / 1000);
  };

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
        {lastInactiveTime && getSecondsTimer(elapsedTime) > 2 ? (
          <div className="inactive-timer">
            Idle for: {formatElapsedTime(elapsedTime)}
          </div>
        ) : (
          <div className="inactive-timer">You are active now.</div>
        )}

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
