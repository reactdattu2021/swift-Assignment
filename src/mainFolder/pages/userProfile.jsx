import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./userProfile.css"; 
import { BsArrowLeft } from "react-icons/bs";

const UserProfile = ({ userprop }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUser(data[0]); // First user
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "";
  return (
    <>
     
      <div className="welcome-header">
        <button className="back-button" onClick={() => navigate("/")}>
          <BsArrowLeft />
        </button>
        {user && <h2 className="welcome-text">Welcome, {user.name}</h2>}
      </div>

      <div className="grid-form">
        {/* Profile Header */}
        <div className="grid-header5">
          <h1>
            {user?.name
              ? user.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()
              : ""}
          </h1>
          <div>
            <h3>{user?.name || "Loading..."}</h3>
            <p>{user?.email || ""}</p>
          </div>
        </div>

        {/* Grid Fields */}
        <div className="grid-item">
          <label>User ID:</label>
          <input type="text" value={user?.id || ""} readOnly />
        </div>
        <div className="grid-item">
          <label>Username:</label>
          <input type="text" value={user?.username || ""} readOnly />
        </div>
        <div className="grid-item">
          <label>Email ID:</label>
          <input type="email" value={user?.email || ""} readOnly />
        </div>
        <div className="grid-item">
          <label>Address:</label>
          <input
            type="text"
            value={
              user?.address
                ? `${user.address.street}, ${user.address.city}`
                : ""
            }
            readOnly
          />
        </div>
        <div className="grid-item full-width">
          <label>Phone Number:</label>
          <input type="tel" value={user?.phone || ""} readOnly />
        </div>
      </div>
    </>
  );
};
export default UserProfile;
