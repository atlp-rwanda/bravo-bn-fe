import React from 'react';
import "./Navbar.scss";

const Navbar = () => {
    return ( 
        <div className='navbar'>
            <div className='left'>
                <span>Barefoot.</span>
                <span>Nomad</span>
            </div>
            <div className='center'>
                    <span>Home</span>
                    <span>Dashboard</span>
                    <span>Hotels</span>
                    <span>About us</span>
                    <span>Contact us</span>
            </div>
            <div className='right'>
                <span><i class="fa-solid fa-bell"></i></span>
                <img src="https://media-exp1.licdn.com/dms/image/C4E03AQGls0evv2rK2Q/profile-displayphoto-shrink_800_800/0/1584021640268?e=1665619200&v=beta&t=uO5zwr2Fb3xIvgCRLaT-U9OLTlSrt8W7Fi9bYpk2zSI" alt="" />
            </div>
        </div>
     );
}
 
export default Navbar;