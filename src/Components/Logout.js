
import { useHistory } from 'react-router';
import { handleLogOut } from "../utils/helper";

const Logout= () => {
    const history = useHistory();
    handleLogOut();
    history.push("/login");
    return null;
  };

export default Logout;