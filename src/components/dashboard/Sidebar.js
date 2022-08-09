import React from 'react';
import Users from './Users';

const Sidebar = () => {
    return ( 
        <div className="sidebar-contents">
              <div>
                <span class="iconify" data-icon="bxs:grid-alt"></span>
                <span>Dashboard</span>
            </div>
            <div >
                <span class="iconify" data-icon="clarity:users-solid"></span>
                <span>
                    <a href={Users} />
                    Users
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
            <div >
                <span><i class="fa-solid fa-plane"></i></span>
                <span>Trip requests</span>
            </div>
        </div>
     );
}
 
export default Sidebar;