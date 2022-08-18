import React, { useState } from "react";
import Sidebar from "../Sidebar";
import TripRequests from "./TripRequests";

const Contents = ({ openPopup, setOpenPopup, setData }) => {
  return (
    <div className="contents-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="contents">
        <TripRequests openPopup={openPopup} setOpenPopup={setOpenPopup} />
      </div>
    </div>
  );
};
export default Contents;
