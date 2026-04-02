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
  const [fieldErrors, setFieldErrors] = useState({ email: false, password: false });
  const redirect = new URLSearchParams(location.search).get("redirect") ||'/'
  const navigate = useNavigate();


  const loginSubmit = (e) => {
    e.preventDefault();
    const requiredErrors = {
      email: !loginEmail.trim(),
      password: !loginpass.trim(),
    };

    setFieldErrors(requiredErrors);

    if (requiredErrors.email || requiredErrors.password) {
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
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-16">
  <div className="w-full max-w-md">

    {/* Logo / Brand */}
    <div className="flex justify-center mb-8">
      <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shadow-lg shadow-amber-400/10">
        <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      </div>
    </div>

    {/* Card */}
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl px-8 py-10">

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">Sign In</h2>
        <p className="mt-2 text-slate-400 text-sm">Welcome back! Please enter your details.</p>
      </div>

      <form onSubmit={loginSubmit} className="space-y-5">

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </span>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => {
                const value = e.target.value;
                setLoginEmail(value);
                if (value.trim()) {
                  setFieldErrors((prev) => ({ ...prev, email: false }));
                }
              }}
              onBlur={() => {
                setFieldErrors((prev) => ({ ...prev, email: !loginEmail.trim() }));
              }}
              placeholder="Enter your email"
              className={`w-full bg-slate-900/70 border ${fieldErrors.email ? "border-red-500" : "border-slate-700"} ${fieldErrors.email ? "focus:border-red-500 focus:ring-red-500/20" : "focus:border-amber-400 focus:ring-amber-400/20"} focus:ring-2 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200`}
            />
          </div>
          {fieldErrors.email && (
            <p className="mt-2 text-sm text-red-400">✕ Email is required</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </span>
            <input
              type="password"
              value={loginpass}
              placeholder="Enter your password"
              onChange={(e) => {
                const value = e.target.value;
                setLoginPass(value);
                if (value.trim()) {
                  setFieldErrors((prev) => ({ ...prev, password: false }));
                }
              }}
              onBlur={() => {
                setFieldErrors((prev) => ({ ...prev, password: !loginpass.trim() }));
              }}
              className={`w-full bg-slate-900/70 border ${fieldErrors.password ? "border-red-500" : "border-slate-700"} ${fieldErrors.password ? "focus:border-red-500 focus:ring-red-500/20" : "focus:border-amber-400 focus:ring-amber-400/20"} focus:ring-2 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200`}
            />
          </div>
          {fieldErrors.password && (
            <p className="mt-2 text-sm text-red-400">✕ Password is required</p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            to="/forgot/password"
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors duration-150"
          >
            Forgot Password? Reset Here
          </Link>
        </div>

        {/* Submit */}
        <div className="pt-1">
          <button className="w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 bg-amber-400 hover:bg-amber-300 text-slate-900 shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 active:scale-[0.98]">
            Sign In
          </button>
        </div>

      </form>

      {/* Sign Up Link */}
      <p className="text-center text-slate-500 text-xs mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors duration-150">
          Sign Up
        </Link>
      </p>

    </div>
  </div>
</div>
  );
}

export default Login;
