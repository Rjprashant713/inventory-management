import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { isLoggedIn } from "./utils/helper";

const Auth = (ComposedComponent) => {
  const AuthComponent = (props) => {
    const history = useHistory();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAndRedirect = () => {
        const isLogged = isLoggedIn();
        // console.log("isLoggedIn", isLogged);

        setIsAuthenticated(isLogged);
        if (!isLogged) {
          history.push("/login");
          return;
        }
      };
      checkAndRedirect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>{isAuthenticated ? <ComposedComponent {...props} /> : null}</>;
  };

  return AuthComponent;
};

export default Auth;
