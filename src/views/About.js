import React from "react";
import about_svg from "../assets/about.svg";

export default function About() {
  return (
    <div className="about-page">
      <div className="left">
        <h1 className="title">About Us</h1>
        <p>
        Make
          company global travel and accommodation easy and convenient for the
          strong workforce of savvy members of staff, by leveraging the modern
          web technology services.
        </p>
        <p>
          Barefoot Nomad is an application that will enable its "Company Nomads"
          book their travel and accommodation easily and conveniently across all
          the locations/centers where the company has its operations.
        </p>
      </div>
      <div className="right">
        <center>
          <img src={about_svg} />
        </center>
      </div>
    </div>
  );
}
