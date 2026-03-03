import React from "react";
import "../UserStyles/UserDashboard.css";
import { useNavigate } from "react-router-dom";

function UserDashboard({ user }) {
  const option = [
    { name: "Orders", funcName: orders },
    { name: "Account", funcName: account },
    { name: "Logout", funcName: logout },
  ];
  const navigate = useNavigate()

  function orders() {}
  function account() {}
  function logout() {}
  return (
    <div className="dashboard-container">
      <div className="profile-header">
        <img
          src={user.avatar.url ? user.avatar : "./images/profile"}
          className="profile-avatar"
          alt="Profile Pivture"
        />
        <span className="profile-name">{user.name || "User"}</span>
      </div>

      <div className="menu-options">
        {option &&
          option.map((item) => (
          <button onClick={item.funcName} className="menu-option-btn">{item.name}</button>))}
      </div>
    </div>
  );
}

export default UserDashboard;
