// app.js
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import { Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Error from "./components/ErrorElement";
import { ToastContainer, toast } from "react-toastify"; // Import react-toastify
import NotFound from "./components/NotFound";
let timeoutID = 1;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalUnits, setTotalUnits] = useState(0);
  const [siteTheme, setSiteTheme] = useState("false");

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = siteTheme === "light" ? "dark" : "light";
    setSiteTheme(newTheme);
    document.body.className = newTheme === "light" ? "bg-light" : "bg-dark";
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setSiteTheme(savedTheme);
    document.body.className = savedTheme === "light" ? "bg-light" : "bg-dark";
  }, []);

  return (
    <main class="container-fluid">
      <Navbar
        totalUnits={totalUnits}
        toggleTheme={toggleTheme}
        siteTheme={siteTheme}
      />
      <div
        className={`container ${
          siteTheme === "light" ? "bg-light" : "bg-dark"
        }`}
      >
        <Routes>
          <Route
            exact
            path="/unit-selection"
            errorElement={
              <Error massage="متاسفم مشکلی پیش آمد لطفا کمی صبر کنید و دوباره امتحان کنید" />
            }
            element={
              <MainContent
                siteTheme={siteTheme}
                setSiteTheme={setSiteTheme}
                setTotalUnits={setTotalUnits}
              />
            }
          />
          <Route path="/unit-selection/about" element={<AboutUs />} />
          <Route element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </div>
    </main>
  );
}

export default App;