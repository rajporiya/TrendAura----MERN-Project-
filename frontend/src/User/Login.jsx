import React, { useEffect, useState } from "react";
import "../UserStyles/Form.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, removeError, removeSuccess } from "../feature/user/userSlice";
import { toast } from "react-toastify";

function Login() {
  const { error, loading, success, isAuthenticated } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const location = useLocation()
  const [loginEmail, setLoginEmail] = useState("");
  const [loginpass, setLoginPass] = useState("");
  const redirect = new URLSearchParams(location.search).get("redirect") ||'/'
  const navigate = useNavigate();


  const loginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginpass) {
      toast.error("Email and password are required", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    dispatch(login({ email: loginEmail, password: loginpass }));
  };
  // Error
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right", autoClose: 2000 });

      dispatch(removeError());
    }
  }, [error, dispatch]);
  
  // Success
  useEffect(() => {
    if (success && isAuthenticated) {
      toast.success("Login successfull! Redirecting...", {
        position: "top-right",
        autoClose: 3000,
      });

      const timer = setTimeout(() => {
        dispatch(removeSuccess());
        navigate(redirect);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [success, isAuthenticated, dispatch, navigate, redirect]);

  return (
    <div className="form-container container">
      <div className="form-content">
        <form onSubmit={loginSubmit} className="form">
          <h2>Sign In</h2>
          <div className="input-group">
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={loginpass}
              placeholder="Password"
              onChange={(e) => setLoginPass(e.target.value)}
            />
          </div>
          <button className="authBtn">Sign In</button>
          <p className="form-links">
            Forgot Password?<Link to="/forgot/password">Reset Here</Link>
          </p>
          <p className="form-links">
            Don't Have Account?<Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
