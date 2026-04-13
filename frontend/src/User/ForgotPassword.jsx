import React, { useEffect, useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../componant/PageTitle'
import Footer from '../componant/Footer'
import Navbar from '../componant/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, removeError, removeSuccess } from '../feature/user/userSlice'
import { toast } from 'react-toastify'
import Loader from '../componant/Loader'
import { Link, useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const {loading, error, success, message}= useSelector(state=>state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail]=useState("")
    const forgotPasswordEmail=(e)=>{
        e.preventDefault();
        const myForm = new FormData()
        myForm.set('email',email)
        dispatch(forgotPassword(myForm))
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
          toast.success(message, { position: "top-right", autoClose: 3000 });
          dispatch(removeSuccess());
          navigate("/profile");
        }
      }, [success, dispatch]);
  return (
    <>
  {loading ? (
    <Loader />
  ) : (
    <>
  <PageTitle title="Forgot Password" />
  <Navbar />

  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4 py-16">
    <div className="w-full max-w-md">

      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-lg shadow-amber-500/10">
          <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200 dark:border-slate-700/50 rounded-2xl shadow-2xl px-8 py-10">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Forgot Password</h2>
          <p className="mt-2 text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
            Enter your registered email and we'll send you a reset link.
          </p>
        </div>

        <form action="" className="space-y-5" onSubmit={forgotPasswordEmail}>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </span>
              <input
                type="email"
                placeholder="Enter Your Registered Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="name"
                className="w-full bg-gray-50 dark:bg-slate-900/70 border border-gray-200 dark:border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200"
              />
            </div>
          </div>

          <div className="pt-1">
            <button className="w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 bg-amber-500 hover:bg-amber-400 dark:hover:bg-amber-300 text-slate-900 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-[0.98]">
              Send Reset Link
            </button>
          </div>

        </form>

        <p className="text-center text-gray-400 dark:text-slate-500 text-xs mt-6">
          Remember your password?{" "}
          <Link to="/login" className="text-amber-500 hover:text-amber-400 dark:hover:text-amber-300 font-semibold transition-colors duration-150">
            Back to Login
          </Link>
        </p>

      </div>
    </div>
  </div>

  <Footer />
</>
  )}
</>
  )
}   

export default ForgotPassword
