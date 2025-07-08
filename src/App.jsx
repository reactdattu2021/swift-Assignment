import React, { useEffect, useState } from "react";

// import './App.css'
import Navber from './mainFolder/pages/navber'
import Homepage from './mainFolder/pages/home'
import UserProfile from './mainFolder/pages/userProfile'


function App() {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    // Fetch user once and pass to Navber and UserProfile
    const fetchUser = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUser(data[0]);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  // Get initials from user name
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <>
      <Navber initials={initials} fullName={user?.name || ""} />
      <UserProfile user={user} />
    </>
  );
}

export default App
