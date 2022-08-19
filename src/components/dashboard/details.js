import Button from "../Btn";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUsersAsync } from "../../redux/users/userSlice";

const Details = ({ openPopup, setOpenPopup }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.selectedUser);
  const jwtToken = ("; " + document.cookie).split(`; jwt=`).pop().split(";")[0];

  const getOne = async () => {
    try {
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${jwtToken}`,
      };

      let reqOptions = {
        url: `${process.env.API_URL}/user/${data.id}`,
        method: "get",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      console.log(response.data);
      dispatch(getUsersAsync());
      setOpenPopup(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`popupContainer`} style={{ backgroundColor: "#ffffff", borderRadius: 8 ,padding: 15}}>
      <div className="header" >
        <button style={{right: 3}} onClick={() => setOpenPopup(false)}>x</button>
      </div>
      <h1>Users Details </h1>
      <div className="row">
        <div className="title">Username:</div>
        <div>{data.username}</div>
      </div>
      <div className="row">
        <div className="title">Email:</div>
        <div>{data.email}</div>
      </div>
      <div className="row">
        <div className="title">Phone Number:</div>  
        <div>{data.phoneNumber}</div>
      </div>
      <div className="row">
        <div className="title">Gender:</div>
        <div>{data.gender}</div>
      </div>
      <div className="row">
        <div className="title">Birthdate:</div>
        <div>{data.birthDate}</div>
      </div>
      <div className="row">
        <div className="title">Return Date:</div>
        <div>{data.isVerified ? 'true': 'false'}</div>
      </div>
      
      <div className="buttons">
      <Button  data-testid="btn1" variant="primary" onClick={() => changeRole()}>Save</Button>
      </div>
    </div>
  );
};

export default Details;