import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MainSidebar from "./MainSideBar";
import { useHistory } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  const history = useHistory();

  // to initialized `lastActivity` with the current time.
  const [lastActivity, setLastActivity] = useState(new Date().getTime());

  useEffect(() => {
    // to updates the `lastActivity` state with the current time.
    const resetTimer = () => {
      setLastActivity(new Date().getTime());
    };

    // Defines an array of activity events to listen for.
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    // Adds event listeners for each activity event that call the `resetTimer` function when triggered.
    for (let i = 0; i < activityEvents.length; i++) {
      const event = activityEvents[i];
      document.addEventListener(event, resetTimer);
    }

    // Removes the event listeners when the component unmounts or when the dependency array changes.
    return () => {
      for (let i = 0; i < activityEvents.length; i++) {
        const event = activityEvents[i];
        document.removeEventListener(event, resetTimer);
      }
    };
  }, []); // Empty dependency array ensures the effect runs only once on component mount.

  useEffect(() => {
    // Calculates the elapsed time since the last activity.
    const checkInactivity = () => {
      const currentTime = new Date().getTime();
      const elapsedInactiveTime = currentTime - lastActivity;

      // If the elapsed time exceeds 5 minutes (300000 milliseconds), redirects the user to the "/logout" route.
      if (elapsedInactiveTime > 300000) {
        history.push("/logout");
      }
    };

    // Sets up an interval that calls the `checkInactivity` function every second.
    const inactivityTimer = setInterval(checkInactivity, 1000);

    // Cleans up the interval when the component unmounts or when the dependency array changes.
    return () => {
      clearInterval(inactivityTimer);
    };
    // eslint-disable-next-line
  }, [lastActivity]); // Runs the effect whenever the `lastActivity` state changes.

  return (
    <>
      <Navbar lastInactiveTime={lastActivity}/>
      <div className="dashboard-container">
        <MainSidebar />
        <div className="dashboard-content">{children}</div>
      </div>
    </>
  );
};

export default DefaultLayout;
