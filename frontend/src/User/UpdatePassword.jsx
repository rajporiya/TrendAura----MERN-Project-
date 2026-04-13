import React, { useEffect, useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../componant/PageTitle'
import Navbar from '../componant/Navbar'
import Footer from '../componant/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeError, removeSuccess, updatePassword } from '../feature/user/userSlice'
import { toast } from 'react-toastify'
import useTheme from '../hooks/useTheme'
import ThemeToggle from '../componant/ThemeToggle'

function UpdatePassword() {
    const [oldPassword, setOldPassword]=useState("")
    const [newPassword, setNewPassword]=useState("")
    const [confirmPassword, setConfirmPassword]=useState("")
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const {error, loading,success}=useSelector(state=>state.user);
    const { theme, toggleTheme } = useTheme();
const isDark = theme === "dark";  
    
    const updatePasswordSubmit=(e)=>{
        e.preventDefault()
        
        // Validate that new password and confirm password match
        if (newPassword !== confirmPassword) {
            toast.error("Passwords don't match", { position: "top-right", autoClose: 2000 });
            return;
        }
        const myForm = new FormData()
        myForm.set('oldPassword',oldPassword )
        myForm.set('newPassword',newPassword )
        myForm.set('confirmPassword',confirmPassword )
        console.log(myForm.entries() );
        dispatch(updatePassword(myForm))
    }
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
          toast.success("Password updated successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          dispatch(removeSuccess());
          navigate("/profile");
        }
      }, [success, dispatch]);
  return (
<>
  <PageTitle title="Update Password" />
  <Navbar />

  <div
    className={`min-h-screen flex items-center justify-center px-4 py-16 transition-colors duration-300 ${
      isDark
        ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        : "bg-gradient-to-br from-slate-100 via-white to-slate-100"
    }`}
  >
    <div className="w-full max-w-md">

      {/* Logo / Brand */}
      <div className="flex justify-center mb-8">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-300 ${
            isDark
              ? "bg-amber-500/10 border border-amber-500/20 shadow-amber-500/10"
              : "bg-amber-50 border border-amber-200 shadow-amber-100"
          }`}
        >
          <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
        </div>
      </div>

      {/* Card */}
      <div
        className={`rounded-2xl shadow-2xl px-8 py-10 transition-colors duration-300 ${
          isDark
            ? "bg-slate-800/60 backdrop-blur-sm border border-slate-700/50"
            : "bg-white border border-slate-200"
        }`}
      >

        {/* ── Toggle Row ── */}
        <div className="flex items-center justify-end gap-2 mb-6">
          <span
            className={`text-xs font-medium transition-colors duration-300 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {isDark ? "Dark Mode" : "Light Mode"}
          </span>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <div className="text-center mb-8">
          <h2
            className={`text-3xl font-bold tracking-tight transition-colors duration-300 ${
              isDark ? "text-white" : "text-slate-800"
            }`}
          >
            Update Password
          </h2>
          <p
            className={`mt-2 text-sm transition-colors duration-300 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Keep your account secure with a strong password.
          </p>
        </div>

        <form onSubmit={updatePasswordSubmit} className="space-y-5">

          {/* Old Password */}
          <div>
            <label
              className={`block text-xs font-semibold uppercase tracking-widest mb-1.5 transition-colors duration-300 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Old Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  className={`w-4 h-4 transition-colors duration-300 ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                  fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </span>
              <input
                type="password"
                placeholder="Old Password"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className={`w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 border focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 ${
                  isDark
                    ? "bg-slate-900/70 border-slate-700 text-white placeholder-slate-500"
                    : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
                }`}
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label
              className={`block text-xs font-semibold uppercase tracking-widest mb-1.5 transition-colors duration-300 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              New Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  className={`w-4 h-4 transition-colors duration-300 ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                  fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </span>
              <input
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 border focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 ${
                  isDark
                    ? "bg-slate-900/70 border-slate-700 text-white placeholder-slate-500"
                    : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
                }`}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className={`block text-xs font-semibold uppercase tracking-widest mb-1.5 transition-colors duration-300 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  className={`w-4 h-4 transition-colors duration-300 ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                  fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </span>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 border focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 ${
                  isDark
                    ? "bg-slate-900/70 border-slate-700 text-white placeholder-slate-500"
                    : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
                }`}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-1">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-[0.98]"
            >
              Update Password
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>

  <Footer />
</> 
  )
}

export default UpdatePassword
