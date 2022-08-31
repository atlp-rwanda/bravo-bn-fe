import React, { useState, useEffect, Fragment } from "react";
import Button from "../components/Button";
import Input from "../components/Input/Input.js";
import TextArea from "../../src/components/TextArea/TextArea.js";
import axios from "axios";
import {Alert} from "@mui/material"
import { useNavigate } from "react-router-dom";

import Map from "../../src/components/Map";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const Accomodation = () => {
  const initialValues = {
    facility: "",
    description: "",
    location: "",
    image: "",
    highlight: "",
    amenities: "",
    geoLocation: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([]);
  const [position, setPosition] = useState(null);
  const [locations, setLocations] = useState();
  const navigate =useNavigate()
  const [alert, setAlert] = useState({
    message: "",
    status: null,
  });
  const latlng = [];

  const jwtToken = ("; " + document.cookie).split(`; jwt=`).pop().split(";")[0];

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log("errors", formErrors);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length == 0 && isSubmit) {
    }
  }, [formErrors]);

  useEffect(() => {
    const fetchLocations = async () => {
      const locationsData = await axios({
        url: "https://bravo-bfn-be.herokuapp.com/api/v1/location",
        method: "GET",
      });
      if (locationsData) {
        setLocations(locationsData.data.data.locationList.rows);
      }
    };
    fetchLocations();
  }, []);

  if (position !== null) {
    const coordinates = Object.entries(position);

    latlng.push(coordinates[0][1], coordinates[1][1]);
  }



  const validate = (values) => {
    const errors = {};
    if (!values.facility) {
      errors.facility = "Name of the facility is required";
    } else if (!values.description) {
      errors.description  = "Description is required";
    }
    else if (!values.highlight) {
      errors.highlight = "Highlight is required";
    }
    else if (!values.amenities) {
      errors.amenities = " Amenities is required";
    }
    else if (values.amenities!=="" && values.facility!==""&& values.description!=="" && values.highlight!=="") {
      axios({
        url: "https://bravo-bfn-be.herokuapp.com/api/v1/accomodation",
        method: "POST",
        headers: { Authorization: `Bearer ${jwtToken}` },
        data: {
          name: formValues.facility,
          description: formValues.description,
          locationId: formValues.location,
          image: formValues.image,
          geoLocation: latlng.toString(),
          highlight: formValues.highlight,
          amenitiesList: formValues.amenities.split(","),
        },
      })
      .then((response) => {
        console.log(response);
        if(response){
          setFormValues(initialValues)
          setAlert({
            message: response.statusText,
            status: response.status,
          });
          setTimeout(() => {
            setAlert({ message: "" });
          }, 2200);
         
        }
        navigate("/dashboard");
      })
      .catch((error) =>{
        console.log(error)
        setAlert({
          message: error.response.data.message,
          status: error.response.status,
        });
        setTimeout(() => {
          setAlert({ message: "" });
        }, 2200);
      } );
    }

    return errors;
  }

  return (
    <div className="Accomodation">
      <div className="accomodation--paragraph">
        <center>
        <h3>
          Barefoot.<span className="accomodation-nomad">Nomad</span>
        </h3>
        </center>
        <p className="accomodation-facility">
          Create an Accomodation facility
        </p>
        <form onSubmit={handleSubmit}>
          <div className="icon-inside1">
            <Input
              className={formErrors?.facility ? "borderColors" : "accomodation--input"}
              type="text"
              name="facility"
              data-testid="emailInput"
              placeholder="Name of facility"
              value={formValues.facility}
              onChange={handleChange}
            />

            <p className="error">{formErrors.facility}</p>
          </div>
          <div className="icon-inside">
            <TextArea
              className={formErrors?.description ? "borderArea" : "accomodation--area"}
              type="text"
              name="description"
              data-testid="emailInput"
              placeholder="Description"
              value={formValues.description}
              onChange={handleChange}
            />
            <p className="error">{formErrors.description}</p>
          </div>
          <div className="icon-inside">
            <select
              className="accomodation--select"
              name="location"
              value={formValues.location}
              onChange={handleChange}
            >
              <option value={null} className="option">
                --select location--
              </option>

              {locations &&
                locations?.map((location) => (
                  <option
                    value={location.id}
                    key={location.id}
                    className="option"
                  >
                    {location.locationName}
                  </option>
                ))}
            </select>
           
          </div>
          <Map
            setCurrentLocation={setCurrentLocation}
            position={position}
            setPosition={setPosition}
          />
          <div className="icon-inside">
            <input
              className="accomodation--image"
              type="file"
              name="image"
              placeholder="Image"
              value={formValues.image}
              onChange={handleChange}
            />
          </div>
          <div className="icon-inside">
            <Input
              className={formErrors?.highlight ? "borderColors" : "accomodation--input"}
              type="text"
              name="highlight"
              placeholder="Highlight"
              value={formValues.highlight}
              onChange={handleChange}
            />
             <p className="error">{formErrors.highlight}</p>
          </div>
          <div className="icon-inside">
            <Input
              className={formErrors?.amenities ? "borderColors" : "accomodation--input"}
              type="text"
              name="amenities"
              data-testid="emailInput"
              placeholder="Amenities"
              value={formValues.amenities}
              onChange={handleChange}
            />
             <p className="error">{formErrors.amenities}</p>
          </div>
          <Button className="accomodation--btn">Create an Accomodation</Button>
        </form>
                  {alert.message &&(
              <div style={{ paddingTop: 50 }}>
                <Alert
                  variant="filled"
                  severity={
                    alert.status === 200 || alert.status === 201
                      ? "success"
                      : "error"
                  }
                  sx={{ width: "40%", marginRight: "20px" }}
                >
                  {alert.message}
                </Alert>
              </div>)}
            
        <center>
        <p className="accomodation--footer">
          &copy;Copyright Barefoot nomad 2022
        </p>
        </center>
        

      </div>
    </div>
  );
};
export default Accomodation;
