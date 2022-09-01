import * as React from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { updateUserRoleAsync } from '../../../redux/users/userSlice';


const  UserDetailsModal = (props) => {
    const { onClose, selectedValue, open } = props;
    const [role, setRole] = React.useState(selectedValue?.role || '');
    const dispatch  = useDispatch();

    const handleChange = (event) => {
      setRole(event.target.value);
      console.log(event.target.value);
    };
    React.useEffect(()=> {
        setRole(selectedValue?.role)
    },[selectedValue])

    const onSubmit = () => {
        dispatch(updateUserRoleAsync({email: selectedValue.email, role : role}))
        onClose()
    }


    return (
        <div className={`popup-container`} style={{display:`${open == true ? 'flex' : 'none'}`}}>
            
      <div className={`container`}  style={{ transform:'translateY(0%)', transition: 'all 1s ease'}}>
       
                
       <div>
   <div>
       <img src={selectedValue?.image} alt="Avatar"/>
   </div>
   <div className="card-content"  >
       <span>{selectedValue?.firstname}</span>
           <span data-testid="email">Email:{selectedValue?.email}</span>
           <span data-testid="phoneNumber" >Phone Number:{selectedValue?.phoneNumber}</span>
           <span data-testid="gender">Gender:{selectedValue?.gender}</span>
           <span data-testid="username">username:{selectedValue?.username}</span>
           <span data-testid="Verified">Verified:{selectedValue?.isVerified ?  (<Button variant='contained' color="success"> Yes</Button>) :  (<Button variant='contained' color="error" size="small">No</Button>) }</span>
           <span>Role:{selectedValue?.role}
           <Select
   labelId="demo-simple-select-label"
   id="demo-simple-select"
   value={role || ''}
   label="Role"
   onChange={handleChange}
>
   <MenuItem value={""}>Select</MenuItem>
   <MenuItem value={"super admin"}>Super admin</MenuItem>
   <MenuItem value={"travel admin"}>Travel admin</MenuItem>
   <MenuItem value={"manager"}>Manager</MenuItem>
   <MenuItem value={"requester"}>Requester</MenuItem>
</Select>
           </span>
   </div>
</div>
<div className="buttons">
   <Button  data-testid="btn1"variant='contained'  onClick={() => { onSubmit()}} > Save</Button>
   <Button  data-testid="btn2"  variant="outlined"  onClick={() => {onClose()}}>Close</Button>
</div>
</div>
        </div>
    );
    }

  export default UserDetailsModal;