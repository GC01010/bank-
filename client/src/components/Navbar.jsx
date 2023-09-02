import React from "react";
import { Link,useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="m-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-bank pr-5"
              viewBox="0 0 16 16"
            >
              <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.501.501 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89L8 0ZM3.777 3h8.447L8 1 3.777 3ZM2 6v7h1V6H2Zm2 0v7h2.5V6H4Zm3.5 0v7h1V6h-1Zm2 0v7H12V6H9.5ZM13 6v7h1V6h-1Zm2-1V4H1v1h14Zm-.39 9H1.39l-.25 1h13.72l-.25-1Z" />
            </svg>
            <div className="navbar-brand p-2 " >
              BANK
            </div>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="container" id="navbarSupportedContent">
            <div className="container">
              <div className="row align-items-start mt-3 mb-3">
                <div className="col text-center"><h4><Link to="/home">Home</Link></h4></div>
                <div className="col text-center"><h4><Link to="/services">Services</Link></h4></div>
                <div className="col text-center"><h4><Link to="/transfer">Transfer Money</Link></h4></div>
                <div className="col text-center"><h4><Link to="/profile">Profile</Link></h4></div>
                <div className="col-1  "><button className="btn btn-outline-danger" type="submit" onClick={logout}>
              LogOut
            </button></div>
              </div>
              
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}