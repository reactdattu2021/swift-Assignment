import "./navber.css";
import { useNavigate } from "react-router-dom";
const Navber = ({ initials, fullName }) => {
  
const navigate = useNavigate();
const handleProfileClick = () => {
    navigate("/profile");
  };
  return (
    <nav className="navbar">
      <h1 className="logo"><span className="s-logo"> S</span>WIFT</h1>
      <h2 className="user-info" onClick={handleProfileClick}>
        <span className="initials-circle">{initials}</span>
        <span className="user-name">{fullName}</span>
      </h2>
    </nav>
  )

      

};

export default Navber;
