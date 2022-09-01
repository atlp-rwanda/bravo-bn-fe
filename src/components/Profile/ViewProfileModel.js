import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import { useSelector } from "react-redux";
import { thisUser } from '../../redux/auth/loginSlice'
import userImage from "../../assets/user.png"
import EditPopupModal from "./EditProfileModel";
import { useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  width: '60%',
  bgcolor: 'background.paper',
  border: '4px solid #046CC6',
  borderRadius: 2,
  boxShadow: 24,
};

export default function PopupModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const user = JSON.parse(localStorage.getItem("user"))
  const [openThis, setOpenThis] = useState(false)

  return (
    <div>
      <EditPopupModal openThis={openThis} setOpenThis={setOpenThis} setOpen={setOpen} />
      <div style={{ position: "relative" }}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="profileContainer"
        >
          <Box sx={style} className="ItemsContainer">
            <CardContent sx={{ background: '#046CC6', padding: '10px 20px' }}>
              <Typography id="modal-modal-title" sx={{ color: '#fff', fontSize: '1rem' }} variant="h5" >
                Profile
              </Typography>
            </CardContent>
            <CardContent sx={{ padding: '20px 20px 0 20px' }}>
              <div className="row">
                <div>
                  <img
                    src={user.image ? `${user.image}` : userImage}
                    alt="" width={120}
                  />
                </div>
                <div>
                  <div className="row data">
                    <div className="title">Firstname</div><div>{user.firstName}</div>
                  </div>
                  <div className="row data">
                    <div className="title">Lastname</div><div>{user.lastName}</div>
                  </div>
                  <div className="row data">
                    <div className="title">Username</div><div>{user.username}</div>
                  </div>
                  <div className="row data">
                    <div className="title">Email</div><div>{user.email}</div>
                  </div>
                  <div className="row data">
                    <div className="title">Gender</div><div>{user.gender}</div>
                  </div>
                  <div className="row data">
                    <div className="title">Phone Number</div><div>{user.phoneNumber}</div>
                  </div>
                  <div className="row data">
                    <div className="title">Role</div><div>{user.role}</div>
                  </div>
                  <div className="row data">
                    <div className="title">Language</div><div>{user.preferredLanguage}</div>
                  </div>
                  <div className="row data">
                    <div className="title">Currency</div><div>{user.preferredCurrency}</div>
                  </div>
                  <div className="row data">
                    <div className="title">Department</div><div>{user.department}</div>
                  </div>
                  <div className="row data">
                    <div className="title">Line Manager</div><div>{user.lineManager}</div>
                  </div>


                </div>
              </div>
            </CardContent>
            <CardContent sx={{ margin: '20px 0' }}>
              <Button variant="outlined" size="medium" onClick={() => handleClose()} sx={{ ml: 2, float: 'right', textTransform: 'none', lineHeight: 'normal' }}>
                Close
              </Button>
              <Button variant="contained" size="medium" sx={{ float: 'right', textTransform: 'none', lineHeight: 'normal' }} onClick={() => {
                handleClose()
                setOpenThis(true)
              }}>
                {/* {loading ? <PreLoaderSmall/> : 'Update'} */} Update
              </Button>
            </CardContent>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
