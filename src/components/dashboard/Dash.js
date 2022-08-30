import React, { useState } from "react";
import Contents from "./Contents";
import Footer from "./footer";

const Dash = () => {
  return (
    <div className="dashboard-container">
      <Contents />
      <Footer />
    </div>
  );
};

export default Dash;

