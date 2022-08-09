import React, { useState } from "react";
import Contents from "./Contents";
import Navbar from "./Navbar";
import Footer from "./footer";
import Details from "./details";

const Dash = () => {
  const [openPopup, setOpenpopup] = useState(false);

  return (
    <div className="dashboard-container">
      <Navbar />
      <Contents openPopup={openPopup} setOpenpopup={setOpenpopup} />
      <Footer />
      <div
        className="popup-container"
        style={{ display: `${openPopup ? "flex" : "none"}` }}
      >
        <Details openPopup={openPopup} setOpenpopup={setOpenpopup} />
      </div>
    </div>
  );
};

export default Dash;
