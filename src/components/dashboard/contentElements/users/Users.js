import React from 'react';
import "./Users.scss"
const Users = () => {
    return ( 
        <div className='users'>
            <span>Users</span>
            <div className="user-container">
                <div className='users-title'>
                    <span>UserName</span>
                    <span>Email</span>
                    <span>Role</span>
                    <span>Gender</span>
                    <span>Verified</span>
                </div>
                <div className='user-content'>
                    <span>
                        <img src="https://www.pngkit.com/png/full/86-865680_red-dress-png-image-background-red-dress-transparent.png" alt="profile" />
                        <span>Rose</span>
                    </span>
                    <span>mrose@gmail.com</span>
                    <span>requester</span>
                    <span>female</span>
                    <span>true</span>
                </div>
                <div className='user-content'>
                    <span>
                        <img src="https://www.pngkit.com/png/full/86-865680_red-dress-png-image-background-red-dress-transparent.png" alt="profile" />
                        <span>Rose</span>
                    </span>
                    <span>mrose@gmail.com</span>
                    <span>requester</span>
                    <span>female</span>
                    <span>true</span>
                </div>
            </div>
        </div>
     );
}
 
export default Users;