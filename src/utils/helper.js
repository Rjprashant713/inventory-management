export function hasValue(v) {
    if (typeof v !== "undefined" && v && v !== "") {
      return true;
    }
    return false;
  }
export const isLoggedIn = ()=>{
  let access_token = localStorage.getItem("authToken");
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
    localStorage.removeItem("authToken");
  };
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  export function convertToDateTime(timestamp) {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC' // Adjust the time zone as per your requirement
    };
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, options);
  }

   // func to show dotted format data in table
   export const add3Dots = (string, limit) => {
    var dots = "...";
    if (string && string?.length > limit) {
      string = string.substring(0, limit) + dots;
    }
    return string;
  };