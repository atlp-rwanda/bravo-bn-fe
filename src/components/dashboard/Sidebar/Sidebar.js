import React from 'react';
import "./Sidebar.scss";

const Sidebar = () => {
    return ( 
        <div className="sidebar-contents">
              <div>
                <span><i class="fa-solid fa-grid"></i></span>
                <span>Dashboard</span>
            </div>
            <div >
                <span><i class="fa-solid fa-users"></i></span>
                <span>Users</span>
            </div>
            <div >
                <span><i class="fa-solid fa-hotel"></i></span>
                <span>Hotels</span>
            </div>
            <div >
                <span><i class="fa-solid fa-location-dot"></i></span>
                <span>Locations</span>
            </div>
            <div >
                <span><i class="fa-solid fa-plane"></i></span>
                <span>Trip requests</span>
            </div>
        </div>
     );
}
 
export default Sidebar;