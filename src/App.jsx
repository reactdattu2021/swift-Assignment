import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    <BrowserRouter>
      <Navber initials={initials} fullName={user?.name || ""} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
