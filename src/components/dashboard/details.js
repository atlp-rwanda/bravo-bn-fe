import Button from "../Btn"
import React,{useEffect,useState} from 'react';
import axios from 'axios';

const Details  = ({setOpenpopup,setRowId,openPopup,rowId}) => {
    const [users,setusers]=useState([]);
    const [role,setRole] =useState(null);
    
    const renderState = async () => {
        
      const res = await axios.get(
        `https://bravo-bfn-be.herokuapp.com/api/v1/user/${rowId}`,
        { headers: { Authorization: `Bearer ${document.cookie.split('=')[1]}` } }
      );
    
    const {data}=res.data;
    setusers(data)
    };
    renderState();

    useEffect(() => {
        setusers(users);
    },[role])

const changeRole =async()=>{
    const res = await axios.put(
        'https://bravo-bfn-be.herokuapp.com/api/v1/user/roles',
        {
            email: users.email,
            role:role,
        },
        { headers: { Authorization: `Bearer ${document.cookie.split('=')[1]}` }}
      );
    
    const status=res.status;
    if(status==200){
        setOpenpopup(false)
    }
}

    return (
        <div className={`container`} style={{ transform:'translateY(0%)', transition: 'all 1s ease'}}>
       
                
                    <div>
                <div>
                    <img src={users.image} alt="Avatar"/>
                </div>
                <div className="card-content"  >
                    <span>User</span>
                        <span  >Email:{users.email}</span>
                        <span  >Phone Number:{users.phoneNumber}</span>
                        <span>Gender:{users.gender}</span>
                        <span>username:{users.username}</span>
                        <span>Birthdate:{users.birthDate}</span>
                        <span>Verified:{users.isVerified ? 'true':'false'}</span>
                        <span>Role:{users.role}
                            <select onChange={(e) =>setRole(e.target.value)}>
                                <option value="travel Team Member ">Travel Team Member </option>
                                <option value="manager">Manager </option>
                                <option value="admin">Admin</option>
                                <option value="requester">Requester</option>
                            </select>
                        </span>
                </div>
            </div>



            <div className="buttons">
                <Button  data-testid="btn1" variant="primary" onClick={() => changeRole()}>Save</Button>
                <Button  data-testid="btn2" variant="secondary" onClick={() => setOpenpopup(false)}>Close</Button>
            </div>
        </div>


      );
}
 
export default Details;