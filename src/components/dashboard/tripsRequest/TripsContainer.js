import React, { useState } from "react";
import Contents from "./Contents";
import Navbar from "../Navbar";
import Footer from "../Footer";
const TripsContainer = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [data, setData] = useState([]);

  return (
    <div className="dashboard-container">

      <Contents
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setData={setData}
      />
      <Footer />
    </div>
  );
};
export default TripsContainer;