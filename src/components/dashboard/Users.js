import React,{useEffect,useState} from 'react';
import axios from 'axios';
// import { useState } from '@storybook/addons';

const Users = () => {
    const [users,setUsers]=useState([]);
    useEffect(() => {
        const renderState = async () => {
          const res = await axios.get(
            `https://bravo-bfn-be.herokuapp.com/api/v1/user/`
          );
        const {data}=res.data;
        console.log(data[13]);
        setUsers(data)
        };
        renderState();
      }, []);
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
                {users.map(user=>(
                    <div className='user-content' key={user.id}>
                    <span>
                        <img src="{user.image}" alt="profile" />
                        <span>{user.username}</span>
                    </span>
                    <span>{user.email}</span>
                    <span>{user.role}</span>
                    <span>{user.gender}</span>
                    <span>{user.isVerified == true? user.isVerified:null}</span>
                </div>
   
                ))}
                
                
            </div>
        </div>
     );
}
 
export default Users;