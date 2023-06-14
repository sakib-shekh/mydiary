import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const loginDir = () => {
    navigate("/login");
  };
  const registerDir = () => {
    navigate("/register");
  };
  const logout=()=>{
    window.localStorage.removeItem('token');
    window.location.replace('/login');
  }
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MyDiary{" "}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/about">
                About
              </Link>
            </li>
          </ul>

          {!localStorage.getItem("token") && (
            <div>
              <button
                type="button"
                className="btn btn-primary mx-1"
                onClick={loginDir}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-primary mx-1"
                onClick={registerDir}
              >
                Register
              </button>
            </div>
          )}
          {
            localStorage.getItem("token") && <button
                type="button"
                className="btn btn-primary mx-1"
                onClick={logout}
              >
                Logout
              </button>
          }
          
        </div>
      </div>
    </nav>
  );
}
