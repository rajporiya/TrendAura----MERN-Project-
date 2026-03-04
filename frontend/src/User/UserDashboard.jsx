import React, { useState } from "react";
import "../UserStyles/UserDashboard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {logout, removeSuccess} from '../feature/user/userSlice.js'
import { toast } from "react-toastify";
import { removeError } from "../feature/product/productSllice";

function UserDashboard({ user }) {
  const [menuVisible, setMenuVisible]= useState(false)
  const toggleMenu =()=>{
    setMenuVisible((prev) => !prev)
  }
  const dispatch = useDispatch()
  const options = [
    { name: "Orders", funcName: orders },
    { name: "Account", funcName: account },
    { name: "Logout", funcName: logoutUser },
  ]
  if(user.role === 'admin'){
    options.unshift({
      name : 'Admin', funcName: dashboard
    })
  }
  const navigate = useNavigate()

  function orders() {
    navigate('/orders/user')
  }
  function account() {
     navigate('/profile')
  }
  function logoutUser() {
    dispatch(logout())
    .unwrap()
    .then(()=>{
      toast.success("Logout Successful", {position:'top-right', autoClose: 3000})
      dispatch(removeSuccess())
      navigate('/login')
    }).catch((error)=>{
      toast.error(error?.message || 'Logout failed',{position:'top-right', autoClose: 3000})
      dispatch(removeError());
    })
  }
  function dashboard() {}
  return (
    <>
    <div className={`overlay ${menuVisible ? 'show' : ''}`} onClick={toggleMenu}></div>
    <div className="dashboard-container">
      <div className="profile-header" onClick={toggleMenu}>
        <img 
                src={user?.avatar?.url || "./images/profile.png"}
                alt="Profile"
                className="profile-avatar"
                onError={(e) => {
                  e.target.src = './images/profile.png';
                }}
              />
        <span className="profile-name">{user.name || "User"}</span>
      </div>

      {menuVisible &&
        <div className="menu-options">
        {options &&
          options.map((item) => (
          <button onClick={item.funcName} key={item.name} className="menu-option-btn">{item.name}</button>))}
      </div>}
    </div>
    </>
  );
}

export default UserDashboard;
