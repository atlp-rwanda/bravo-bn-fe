import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from '@mui/material/CardContent';
import Modal from "@mui/material/Modal";
import Button from '@mui/material/Button';
import { Alert } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import { useDispatch, useSelector } from "react-redux";
import { logginUser } from "../../redux/auth/loginSlice";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PreLoaderSmall } from "../PreLoader";
import axios from 'axios'

import { TextField } from "@mui/material";

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

export default function EditPopupModal({ openThis, setOpenThis, setOpen }) {
  const dispatch = useDispatch()
  const handleClose = () => setOpenThis(false);
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"))
  const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', username: '', phoneNumber: '', lineManager: '', preferredLanguage: '', preferredCurrency: '', department: '', gender: '', image: '' })
  const [alert, setAlert] = useState({
    message: "",
    status: null,
  });

  const formData = new FormData()
  formData.append('image', userData.image);
  formData.append('firstName', userData.firstName);
  formData.append('lastName', userData.lastName);
  formData.append('email', userData.email);
  formData.append('username', userData.username);
  formData.append('phoneNumber', userData.phoneNumber);
  formData.append('lineManager', userData.lineManager);
  formData.append('preferredLanguage', userData.preferredLanguage);
  formData.append('preferredCurrency', userData.preferredCurrency);
  formData.append('department', userData.department);
  formData.append('gender', userData.gender);

  const submitUpdates = (e) => {
    e.preventDefault();
    setLoading(true)
    axios.patch(`${process.env.API_URL}/user/update`, formData, {
      headers: { Authorization: `Bearer ${token}`, 'content-type': 'multipart/form-data' },
    }).then((res) => {
      updateState()
      setLoading(false)
      setAlert({
        message: "Profile updated succesfully",
        status: 200,
      })
      setTimeout(() => {
        setAlert({ message: "" });
        setOpen(true)
        setOpenThis(false)
      }, 2200);

    }).catch(err => {
      console.log(err.response.data)
      setLoading(false)
      setAlert({
        message: err.response.data.message,
        status: 500,
      })
      setTimeout(() => {
        setAlert({ message: "" });
      }, 2200);
    })
  }
  const updateState = async () => {
    axios.get(`${process.env.API_URL}/user/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data.data))
      dispatch(logginUser(res.data.data));
    })
  }

  useEffect(() => {
    if (typeof (user.id) == 'number') {
      setUserData({ firstName: user.firstName, lastName: user.lastName, email: user.email, username: user.username, phoneNumber: user.phoneNumber, lineManager: user.lineManager, preferredLanguage: user.preferredLanguage, preferredCurrency: user.preferredCurrency, gender: user.gender, department: user.department, image: user.image })
    }
  }, [user.id])

  return (
    <Modal
      open={openThis}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="profileContainer"
    >
      <Box sx={style} className="ItemsContainer">
        <CardContent sx={{ background: '#046CC6', padding: '10px 20px' }}>
          <Typography id="modal-modal-title" sx={{ color: '#fff', fontSize: '1rem' }} variant="h5" >
            Update Profile
          </Typography>
        </CardContent>

        <CardContent sx={{ padding: '20px 20px 0 20px' }}>
          <form onSubmit={(e) => submitUpdates(e)}>
            <div className="row">
              <TextField
                style={{ width: '-webkit-fill-available', margin: "5px", height: "40px" }}
                type="text"
                label="firstName"
                variant="outlined"
                value={userData.firstName}
                onChange={(e) => { setUserData({ ...userData, firstName: e.target.value }) }}

              />
              <br className="down" />
              <TextField
                style={{ width: '-webkit-fill-available', margin: "5px", height: "40px" }}
                type="text"
                label="lastName"
                variant="outlined"
                value={userData.lastName}
                onChange={(e) => { setUserData({ ...userData, lastName: e.target.value }) }}
              />

            </div>
            <br />
            <div className="row">
              <TextField
                style={{ width: '-webkit-fill-available', margin: "5px", height: "40px" }}
                type="email"
                label="Email"
                variant="outlined"
                value={userData.email}
                onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }}
              />
            </div>
            <br />
            <div className="row">
              <Button
                variant="outlined"
                component="label"
                style={{ width: '-webkit-fill-available', margin: "5px", height: "55px" }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={(e) => { setUserData({ ...userData, image: e.target.files[0] }) }}
                />
              </Button>
              <TextField
                style={{ width: '-webkit-fill-available', margin: "5px", height: "40px" }}
                type="text"
                label="Username"
                variant="outlined"
                value={userData.username}
                onChange={(e) => { setUserData({ ...userData, username: e.target.value }) }}
              />

            </div>
            <br />
            <div className="row">
              <FormControl style={{ width: '-webkit-fill-available', margin: "5px", height: "40px" }}>
                <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={userData.gender}
                  label="Gender"
                  onChange={(e) => { setUserData({ ...userData, gender: e.target.value }) }}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>
              <br className="down" />
              <TextField
                style={{ width: '-webkit-fill-available', margin: "5px", height: "40px" }}
                type="text"
                label="Phone Number"
                variant="outlined"
                value={userData.phoneNumber}
                onChange={(e) => { setUserData({ ...userData, phoneNumber: e.target.value }) }}
              />

            </div>
            <br />
            <div className="row">
              <TextField
                style={{ width: '-webkit-fill-available', margin: "5px", height: "40px" }}
                type="text"
                label="Department"
                variant="outlined"
                value={userData.department}
                onChange={(e) => { setUserData({ ...userData, department: e.target.value }) }}
              />
              <br className="down" />
              <TextField
                style={{ width: '-webkit-fill-available', margin: "5px", height: "40px" }}
                type="text"
                label="Line Manager"
                variant="outlined"
                value={userData.lineManager}
                onChange={(e) => { setUserData({ ...userData, lineManager: e.target.value }) }}
              />

            </div>
            <br />
            <div className="row">
              <FormControl style={{ width: '-webkit-fill-available', margin: "5px", height: "40px" }}>
                <InputLabel id="language">Preferred Language</InputLabel>
                <Select
                  labelId="language"
                  id="language"
                  label="Preferred Language"
                  value={userData.preferredLanguage}
                  onChange={(e) => { setUserData({ ...userData, preferredLanguage: e.target.value }) }}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"English"}>English</MenuItem>
                  <MenuItem value={"French"}>French</MenuItem>
                  <MenuItem value={"Kinyarwanda"}>Kinyarwanda</MenuItem>
                </Select>
              </FormControl >
              <br className="down" />
              <FormControl style={{ width: '-webkit-fill-available', margin: "5px", height: "40px" }}>
                <InputLabel id="Currency">Preferred Currency</InputLabel>
                <Select
                  labelId="Currency"
                  id="Currency"
                  label="Preferred Currency"
                  value={userData.preferredCurrency}
                  onChange={(e) => { setUserData({ ...userData, preferredCurrency: e.target.value }) }}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"USD"}>USD</MenuItem>
                  <MenuItem value={"RWF"}>RWF</MenuItem>
                </Select>
              </FormControl>
            </div>

            <CardContent sx={{ margin: '20px 0' }}>
              {alert.message && (
                <div style={{ paddingTop: 20 }}>
                  <Alert
                    variant="filled"
                    severity={
                      alert.status === 200 || alert.status === 201
                        ? "success"
                        : "error"
                    }
                    sx={{ width: "40%", marginLeft: "auto", marginRight: 0, marginBottom: 2 }}
                  >
                    {alert.message}
                  </Alert>
                </div>
              )}
              <Button type="button" variant="outlined" size="medium" onClick={() => handleClose()} sx={{ ml: 2, float: 'right', textTransform: 'none', lineHeight: 'normal' }}>
                Close
              </Button>
              <Button type="submit" variant="contained" size="medium" sx={{ float: 'right', textTransform: 'none', lineHeight: 'normal' }} >
                {loading ? <PreLoaderSmall /> : 'Update'}
              </Button>
            </CardContent>
          </form>
        </CardContent>
      </Box>
    </Modal>
  );
}
