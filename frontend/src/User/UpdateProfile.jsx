import React, { useEffect, useState } from "react";
import "../UserStyles/Form.css";
import PageTitle from "../componant/PageTitle";
import Navbar from "../componant/Navbar";
import Footer from "../componant/Footer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeError,
  removeSuccess,
  updateProfile,
} from "../feature/user/userSlice";
import Loader from "../componant/Loader";

function UpdateProfile() {
  const { loading, error, user, success, message } = useSelector(
    (state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./images/profile.png");

  const profileImageUpdate = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        //   0=unsend/initial stage, 1 = loading, 2 = success
        // show upload image preview
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.onerror = (e) => {
      toast.error("Error reading file");
    };
    reader.readAsDataURL(file);
  };

  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    if (avatar) {
      myForm.set("avatar", avatar);
    }
    dispatch(updateProfile(myForm));
  };
  // Error
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right", autoClose: 2000 });

      dispatch(removeError());
    }
  }, [error, dispatch]);

  // Suceess
  useEffect(() => {
    if (success) {
      toast.success(message, { position: "top-right", autoClose: 3000 });
      dispatch(removeSuccess());
      navigate("/");
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAvatarPreview(user.avatar?.url || "./images/profile.png");
    }
  }, [user]);
  return (
    <>
  {loading   ? (<Loader />):
    (  <>
      <PageTitle title="Profile Update" />
      <Navbar />
      <div
        className="container  update-container
    <Footer"
      >
        <div className="form-content">
          <form
            encType="multipart/form-data"
            action=""
            className="form"
            onSubmit={updateSubmit}
          >
            <h2>Update Profile</h2>
            <div className="input-group avatar-group">
              <input
                type="file"
                accept="image/*"
                name="avatar"
                className="file-input"
                onChange={profileImageUpdate}
              />
              <img
                src={avatarPreview}
                alt="Profile Picture"
                className="avatar"
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="authBtn">Update</button>
          </form>
        </div>
      </div>
    </>)}
  
  </>
  )
}

export default UpdateProfile;
