import "./navber.css";
const Navber = ({ initials, fullName }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">Swift</h1>
      <h2 className="user-info">
        <span className="initials-circle">{initials}</span>
        <span className="user-name">{fullName}</span>
      </h2>
    </nav>
  )

      

};

export default Navber;
