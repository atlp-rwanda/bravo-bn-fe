import Button from "../Btn"
import React,{useEffect,useState} from 'react';
import axios from 'axios';

const Details  = ({setOpenpopup,openPopup}) => {
    const [users,setUsers]=useState([]);
useEffect(() => {
    const renderState = async () => {
      const res = await axios.get(
        `https://bravo-bfn-be.herokuapp.com/api/v1/user/${id}`
      );
    const {data}=res.data;
    
    setUsers(data)
    };
    renderState();
  }, []);

    return (
        <div className={`container`} style={{ transform:'translateY(0%)', transition: 'all 1s ease'}}>
        {users.map(user=>(
                
                    <div>
                <div>
                    <img src={user.image} alt="Avatar"/>
                </div>
                <div class="card-content">
                        <span>Email:{user.email}</span>
                        <span>Phone Number:{user.phoneNumber}</span>
                        <span>Gender:{user.gender}</span>
                        <span>username:{user.username}</span>
                        <span>Birthdate:{user.birthDate}</span>
                        <span>Verified:{user.isVerified ? 'true':'false'}</span>
                        <span>Role:{user.role}
                            <select>
                                <option value="">Travel Team Member </option>
                                <option value="">Manager </option>
                                <option value="">Admin</option>
                                <option value="">Requester</option>
                            </select>
                        </span>
                </div>
            </div>

))}
            <div className="buttons">
                <Button variant="primary">Save</Button>
                <Button variant="secondary" onClick={() => setOpenpopup(false)}>Close</Button>
            </div>
        </div>


      );
}
 
export default Details;