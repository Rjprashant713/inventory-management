import { Cookies } from "react-cookie";
const cookie = new Cookies();

export function hasValue(v) {
    if (typeof v !== "undefined" && v && v !== "") {
      return true;
    }
    return false;
  }
export const isLoggedIn = ()=>{
  let access_token = cookie.get("authToken");
  if (hasValue(access_token)) {
    return true;
  }
  return false;
}

export const handleLogOut = () => {
    // Clearing localStorage items
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("UserEmail");
    localStorage.removeItem("isLoggedIn");

    // Clearing the authToken cookie
    cookie.remove("authToken");
  };
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
