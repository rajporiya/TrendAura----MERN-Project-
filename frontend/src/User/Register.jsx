import React, { useEffect, useState } from "react";
import "../UserStyles/Form.css";
import { Link, useNavigate } from "react-router-dom";
import { Password } from "@mui/icons-material";
import PageTitle from "../componant/PageTitle";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register, removeError, removeSuccess } from "../feature/user/userSlice";

function Register() {
  const {error, loading, success} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./Images/profile.png");
  const navigate = useNavigate()

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      // read file asycronsly
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          //   0=unsend/initial stage, 1 = loading, 2 = success
          // show upload image preview
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !avatar) {
      toast.error("Please fill all required fields including avatar image");
      return;
    }
    // Send JSON with base64 avatar, not FormData
    dispatch(register({
      name,
      email,
      password,
      avatar  // base64 data URL string
    }))
  };

  // Error
  useEffect(() => {
      if (error) {
        toast.error(error, {position: "top-right",autoClose: 2000,});
    
        dispatch(removeError());
      }
    }, [error, dispatch]);

    // Suceess
  useEffect(() => {
      if (success) {
        toast.success('Registration successful! Redirecting to login...', {
          position: "top-right",
          autoClose: 3000,
        });
    
        const timer = setTimeout(() => {
          dispatch(removeSuccess());
          navigate('/login')
        }, );
        
        return () => clearTimeout(timer);
      }
    }, [success, dispatch, navigate]);
  return (
    <div className="form-container container">
      <PageTitle title="Register User" />
      <div className="form-content">
        <form
          onSubmit={registerSubmit}
          action=""
          className="form"
          encType="multipart/form-data"
        >
          <h2>Sign Up</h2>

          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              name="name"
              value={name}
              onChange={registerDataChange}
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={registerDataChange}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={registerDataChange}
            />
          </div>

          <div className="input-group avatar-group">
            <input
              type="file"
              accept="image/"
              className="file-input"
              name="avatar"
              onChange={registerDataChange}
            />
            <img src={avatarPreview} className="avatar" alt="Preview Image" />
          </div>
          <button className="authBtn">{loading ? 'Registering...' : "Sign up"}</button>
          <p className="form-links">
            ALready have an account?<Link to="/login">Sign in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register
