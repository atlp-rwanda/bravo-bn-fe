
import React from 'react';
import Users from './Users';
import {Link,NavLink} from 'react-router-dom'

const Sidebar = () => {
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
              <div>
                <span class="iconify" data-icon="bxs:grid-alt"></span>
                <span>Dashboard</span>
            </div>
            <div >
                <span class="iconify" data-icon="clarity:users-solid"></span>
                <span>
                    <Link to="/dashboard">Users</Link>
                    </span>
                    
            </div>
            <div >
                <span><i class="fa-solid fa-hotel"></i></span>
                <span>Hotels</span>
            </div>
            <div >
                <span class="iconify" data-icon="entypo:location"></span>
                <span>Locations</span>
            </div>
            <NavLink
        to="/dashboard/requests"
        style={({ isActive }) => (isActive ? activeStyle : inActive)}
      ></NavLink>
            <div >
                <span><i class="fa-solid fa-plane"></i></span>
                <span>Trip requests</span>
            </div>
        </div>
     );
}
 
export default Sidebar;

