import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import ProfilePage from "./pages/ProfilePage";
import TransferPage from "./pages/TransferPage";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/signup"
            element={
              isLoggedIn === "true" ? <Navigate to="/home" /> : <Signup />
            }
          />

          <Route exact path="/login" element={<Login />} />

          <Route exact path="/home" element={<Home />} />

          <Route
            exact
            path="/services"
            element={
              isLoggedIn === "true" ? (
                <ServicesPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            exact
            path="/profile"
            element={
              isLoggedIn === "true" ? <ProfilePage /> : <Navigate to="/login" />
            }
          />

          <Route
            exact
            path="/transfer"
            element={
              isLoggedIn === "true" ? (
                <TransferPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            exact
            path="/*"
            element={
              isLoggedIn === "true" ? <Navigate to="/home" /> : <Login />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
