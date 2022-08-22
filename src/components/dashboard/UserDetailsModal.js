import * as React from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { updateUserRoleAsync } from '../../redux/users/userSlice';
import Typography from '@mui/material/Typography';

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
      <Dialog onClose={onClose} open={open}  fullWidth={true} maxWidth={"md"} style={{ padding: 10}}>
        <DialogTitle>
        <Typography variant="h3" component="h2" style={{ textAlign:'center', color: '#046CC6'}} data-testid="title" >
                User details
        </Typography>
        </DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem autoFocus button >
            <ListItemAvatar>
              <Avatar/>
            </ListItemAvatar>
          </ListItem>
          <ListItem autoFocus button  spacing={5}>
            <ListItemText primary={"First name :"} style={{width: '1.7rem', textAlign:'left'}} />
            <ListItemText primary={selectedValue?.firstName} style={{width: '1.7rem', textAlign:'left'}} />
          </ListItem>
          <ListItem autoFocus button >
            <ListItemText primary={"Last name :"} style={{width: '1.7rem', textAlign:'left'}} />
            <ListItemText primary={selectedValue?.lastName} style={{width: '1.7rem', textAlign:'left'}}  />
          </ListItem>
          <ListItem autoFocus button >
            <ListItemText primary={"Email :"}  style={{width: '1.7rem', textAlign:'left'}} />
            <ListItemText primary={selectedValue?.email} style={{width: '1.7rem', textAlign:'left'}}  />
          </ListItem>
          <ListItem autoFocus button >
            <ListItemText primary={"Gender :"}  style={{width: '1.7rem', textAlign:'left'}} />
            <ListItemText primary={selectedValue?.gender} style={{width: '1.7rem', textAlign:'left'}} />
          </ListItem>

          <ListItem autoFocus button >
          <Stack spacing={50} direction="row">
            <ListItemText primary={"Verified:"} style={{width: '1.7rem', textAlign:'left'}}  />
            {selectedValue?.isVerified ?  (<Button variant='contained' color="success"> Yes</Button>) :  (<Button variant='contained' color="error">No</Button>) }
         </Stack>
            
          </ListItem>
          <ListItem autoFocus >
          <Stack spacing={42} direction="row">
            <ListItemText primary={"Role :"} />
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
            </Stack>

          </ListItem>
        </List>
        <Button variant='contained'  onClick={() => { onSubmit()}} style={{margin:30}}> Save</Button>
      </Dialog>
    );
  }

  export default UserDetailsModal;