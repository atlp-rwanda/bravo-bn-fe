import React, { useState } from "react";
import Sidebar from "../Sidebar";
import User from './Users'
import Footer from '../footer'

const Contents = ({ openPopup, setOpenPopup, setData }) => {
  return (
    <div className="contents-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="contents">
        <User  />
      </div>
     
    </div>
  );
};
export default Contents;