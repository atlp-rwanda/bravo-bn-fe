import React, { useState } from "react";
import Contents from "./Contents";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Details from "./TripDetails";
const TripsContainer = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [data, setData] = useState([]);

  return (
    <div className="dashboard-container">
      <Navbar />
      <Contents
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setData={setData}
      />
      <div
        className="popup-container"
        style={{
          display: `${openPopup ? "flex" : "none"}`,
        }}
      >
        <Details
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          data={data}
        />
      </div>
      <Footer />
    </div>
  );
};
export default TripsContainer;
