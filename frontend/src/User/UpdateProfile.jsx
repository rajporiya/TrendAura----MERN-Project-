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
    // ✅ ONLY UI CHANGED — all logic, state, handlers are identical to your original

<>
  {loading ? (<Loader />) : (
    <>
      <PageTitle title="Profile Update" />
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">

          {/* Logo / Brand */}
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shadow-lg shadow-amber-400/10">
              <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
              </svg>
            </div>
          </div>

          {/* Card */}
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl px-8 py-10">

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white tracking-tight">Update Profile</h2>
              <p className="mt-2 text-slate-400 text-sm">Update your name, email or profile photo.</p>
            </div>

            <form
              encType="multipart/form-data"
              action=""
              onSubmit={updateSubmit}
              className="space-y-5"
            >

              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-4 mb-2">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-400/30 shadow-lg shadow-amber-400/10">
                  <img
                    src={avatarPreview}
                    alt="Profile Picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-900/70 border border-dashed border-amber-400/30 hover:border-amber-400/60 hover:bg-slate-900 text-amber-400/60 hover:text-amber-400 text-xs font-semibold uppercase tracking-widest cursor-pointer transition-all duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    name="avatar"
                    className="hidden"
                    onChange={profileImageUpdate}
                  />
                </label>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-slate-900/70 border border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-slate-900/70 border border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-1">
                <button className="w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 bg-amber-400 hover:bg-amber-300 text-slate-900 shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 active:scale-[0.98]">
                  Update Profile
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )}
</>
  )
}

export default UpdateProfile;
