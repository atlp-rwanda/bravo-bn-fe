import React from "react";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";


const Sidebar = () => {
  const user = useSelector((state) => state.login.user);
  let activeStyle = {
    textDecoration: "none",
    color: "white",
    borderRadius: 8,
    cursor: "pointer",
    backgroundColor: "#046CC6"
  };

  let inActive = {
    paddingLeft: 6,
    color: "black",
    textDecoration: "none",
  };

  return (
    <div className="sidebar-contents">
      <NavLink
        to="/dashboard">
        <div>
          <span class="iconify" data-icon="bxs:grid-alt"></span>
          <span>Dashboard</span>
        </div>
      </NavLink>
      <div>
        <span class="iconify" data-icon="clarity:users-solid"></span>
        <span>
          <a />
          Users
        </span>
      </div>
      <div>
        <span>
          <i class="fa-solid fa-hotel"></i>
        </span>
        <span>Hotels</span>
      </div>
      <div>
        <span class="iconify" data-icon="entypo:location"></span>
        <span>Locations</span>
      </div>
      <NavLink
        to="/accomodation"
        style={({ isActive }) => (isActive ? activeStyle : inActive)}
      >
        <div className="trips">
          <span>
            <i class="fa-solid fa-plane"></i>
          </span>
          <span>Accomodation</span>
        </div>
      </NavLink>
      {user.role == "manager" && (
        <NavLink
          to="/dashboard/trips"
          style={({ isActive }) => (isActive ? activeStyle : inActive)}
        >
          <div>
            <span>
              <i class="fa-solid fa-plane"></i>
            </span>
            <span>Trip requests</span>
          </div>
        </NavLink>
      )}

    </div>

  );
};


export default Sidebar;
