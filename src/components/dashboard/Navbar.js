
import React from 'react';
import barefootLogo from '../../assets/Barefoot. Nomads.svg'
import NotificationsIcon from "@mui/icons-material/Notifications";

const Navbar = () => {
    return ( 
        <div className='navbar'>
            <div className='left'>
                <span><img src={barefootLogo} className="logo" alt="Barefoot logo"/></span>
                
            </div>
            <div className='right'>
                <span><i className="fa-solid fa-bell"></i></span>
                <img src="https://media-exp1.licdn.com/dms/image/C4E03AQGls0evv2rK2Q/profile-displayphoto-shrink_800_800/0/1584021640268?e=1665619200&v=beta&t=uO5zwr2Fb3xIvgCRLaT-U9OLTlSrt8W7Fi9bYpk2zSI" alt="" />
            </div>
            <div className="right">
        <NotificationsIcon />
      </div>
        </div>
     );
}
 
export default Navbar;

