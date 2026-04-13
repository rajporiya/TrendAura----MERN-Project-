import { useState } from "react";
import { Link } from "react-router-dom";
import "../UserStyles/Form.css";

function Login() {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginpass, setLoginPass] = useState("");
  const [errors, setErrors] = useState({});

  const loginSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    // Email Validation
    if (!loginEmail) {
      newErrors.email = "Email is required";
    } 
    else if (!/\S+@\S+\.\S+/.test(loginEmail)) {
      newErrors.email = "Enter a valid email";
    }

    // Password Validation
    if (!loginpass) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Login Successful");
    }
  };

  return (
    // <div className="form-container container">
    //   <div className="form-content">

    //     <form onSubmit={loginSubmit} className="form">

    //       <h2>Sign In</h2>

    //       {/* Email */}
    //       <div className="input-group">
    //         <input
    //           type="email"
    //           value={loginEmail}
    //           onChange={(e) => setLoginEmail(e.target.value)}
    //           placeholder="Email"
    //           className={errors.email ? "input-error" : ""}
    //         />
    //         {errors.email && <p className="error">{errors.email}</p>}
    //       </div>

    //       {/* Password */}
    //       <div className="input-group">
    //         <input
    //           type="password"
    //           value={loginpass}
    //           placeholder="Password"
    //           onChange={(e) => setLoginPass(e.target.value)}
    //           className={errors.password ? "input-error" : ""}
    //         />
    //         {errors.password && <p className="error">{errors.password}</p>}
    //       </div>

    //       <button className="authBtn">Sign In</button>

    //       <p className="form-links">
    //         Forgot Password? <Link to="/forgot/password">Reset Here</Link>
    //       </p>

    //       <p className="form-links">
    //         Don't Have Account? <Link to="/register">Sign Up</Link>
    //       </p>

    //     </form>

    //   </div>    
    // </div>
    <div className="form-container container min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4 py-16">
  <div className="form-content w-full max-w-md">

    <form onSubmit={loginSubmit} className="form bg-white dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200 dark:border-slate-700/50 rounded-2xl shadow-2xl px-8 py-10 flex flex-col gap-5">

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight text-center mb-2">Sign In</h2>

      {/* Email */}
      <div className="input-group flex flex-col gap-1.5">
        <input
          type="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          placeholder="Email"
          className={`w-full bg-gray-50 dark:bg-slate-900/70 border ${errors.email ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "border-gray-200 dark:border-slate-700 focus:border-amber-500 focus:ring-amber-500/20"} focus:ring-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200`}
        />
        {errors.email && <p className="error text-sm text-red-400">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="input-group flex flex-col gap-1.5">
        <input
          type="password"
          value={loginpass}
          placeholder="Password"
          onChange={(e) => setLoginPass(e.target.value)}
          className={`w-full bg-gray-50 dark:bg-slate-900/70 border ${errors.password ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "border-gray-200 dark:border-slate-700 focus:border-amber-500 focus:ring-amber-500/20"} focus:ring-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200`}
        />
        {errors.password && <p className="error text-sm text-red-400">{errors.password}</p>}
      </div>

      <button className="authBtn w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200 bg-amber-500 hover:bg-amber-400 dark:hover:bg-amber-300 text-slate-900 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-[0.98]">
        Sign In
      </button>

      <p className="form-links text-center text-gray-400 dark:text-slate-500 text-xs">
        Forgot Password?{" "}
        <Link to="/forgot/password" className="text-amber-500 hover:text-amber-400 dark:hover:text-amber-300 font-semibold transition-colors duration-150">
          Reset Here
        </Link>
      </p>

      <p className="form-links text-center text-gray-400 dark:text-slate-500 text-xs">
        Don't Have Account?{" "}
        <Link to="/register" className="text-amber-500 hover:text-amber-400 dark:hover:text-amber-300 font-semibold transition-colors duration-150">
          Sign Up
        </Link>
      </p>

    </form>

  </div>
</div>  
  );
}

export default Login;