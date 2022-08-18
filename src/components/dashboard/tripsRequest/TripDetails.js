import Button from "../../Btn";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getRequestAsync } from "../../../redux/requests/requestSlice";

const Details = ({ openPopup, setOpenPopup }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.selectedRequest);
  const jwtToken = ("; " + document.cookie).split(`; jwt=`).pop().split(";")[0];

  const rejectRequest = async () => {
    try {
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${jwtToken}`,
      };

      let reqOptions = {
        url: `${process.env.API_URL}/user/trip/reject/${data.id}`,
        method: "PUT",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      dispatch(getRequestAsync());
      setOpenPopup(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`popupContainer`}>
      <div className="header">
        <h1>Trip Request Details</h1>
        <button onClick={() => setOpenPopup(false)}>x</button>
      </div>
      <div className="content">
        <div className="row">
          <div className="title" data-testid="requester">
            Requester:
          </div>
          <div className="data">{data.passportName}</div>
        </div>
        <div className="row">
          <div className="title" data-testid="requester-address">
            Requester Address:
          </div>
          <div className="data">{data.leavingFrom}</div>
        </div>
        <div className="row">
          <div className="title">Travel Reason:</div>
          <div className="data">{data.travelReason}</div>
        </div>
        <div className="row">
          <div className="title">Travel Type:</div>
          <div className="data">{data.tripType}</div>
        </div>
        <div className="row">
          <div className="title">Travel Date:</div>
          <div className="data">{data.travelDate}</div>
        </div>
        {data.tripType === "Round trip" ? (
          <div className="row">
            <div className="title">Return Date:</div>
            <div className="data">{data.returnDate}</div>
          </div>
        ) : (
          ""
        )}
        <div className="row">
          <div className="title">Accommodation:</div>
          <div className="data">{data.accomodation?.name}</div>
        </div>
        <div className="row">
          <div className="title">Status:</div>
          <div className="data">{data.status}</div>
        </div>
        <div className="buttons">
          <Button
            data-testid="btn1"
            variant={data.status === "pending" ? "success" : "disabled"}
            disabled={data.status != "pending" ? true : false}
          >
            Approve
          </Button>
          <Button
            data-testid="btn1"
            variant={data.status === "pending" ? "danger" : "disabled"}
            disabled={data.status != "pending" ? true : false}
            onClick={() => rejectRequest()}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Details;
