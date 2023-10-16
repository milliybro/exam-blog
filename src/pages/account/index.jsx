import Cookies from "js-cookie";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ROLE, TOKEN } from "../../const";
import { AuthContext } from "../../context/AuthContext";
import "./style.scss"

const AccountPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useContext(AuthContext);

  const logout = () => {
    Cookies.remove(TOKEN);
    localStorage.removeItem(ROLE);
    setIsAuthenticated(false);
    setRole(null);
    navigate("/");
  };
  return (
    <div className="account">
      <h1>Account</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AccountPage;
