import svg from "../assets/request_svg.svg";
import barefootLogo from "../assets/barefoot_logo.svg";
import React, { useState, useEffect } from "react";
import { TextField, Button, TextareaAutosize, Alert } from "@mui/material";
import "../styles/createRequest.scss";
import { Input, Select } from "../components/Input";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

const CreateRequest = () => {
  // const [ToggleForm, setToggleForm] = useState(1);
  const [rooms, setRooms] = useState([]);
  const [locations, setLocations] = useState([]);
  const [accomodations, setAccomodations] = useState([]);
  const [tripData, setTripData] = useState({
    leavingFrom: "",
    goingTo: null,
    travelDate: null,
    returnDate: null,
    travelReason: "",
    accomodationId: null,
    roomId: null,
  });
  const [alert, setAlert] = useState({
    message: "",
    status: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchRooms = async () => {
    const res = await axios.get(`${process.env.API_URL}/rooms`);
    setRooms(res.data.data.rooms);
  };
  const fetchLocations = async () => {
    const res = await axios.get(`${process.env.API_URL}/location`);
    setLocations(res.data.data.locationList.rows);
  };
  const fetchAccomodations = async () => {
    const res = await axios.get(`${process.env.API_URL}/accomodation`);
    setAccomodations(res.data.data.rows);
  };

  useEffect(() => {
    fetchLocations();
    fetchAccomodations();
    fetchRooms();
  }, []);

  const locationNames = [];
  if (locations.length) {
    locations.forEach((location) => {
      locationNames.push({ name: location.locationName, value: location.id });
    });
  }
  const locationOptions = [
    { name: "Going to", value: "select" },
    ...locationNames,
  ];

  const accomodationsName = [];
  if (accomodations.length) {
    accomodations.forEach((accomodation) => {
      if (accomodation.locationId === tripData.goingTo) {
        accomodationsName.push({
          name: accomodation.name,
          value: accomodation.id,
        });
      }
    });
  }
  const accomodationOptions = [
    { name: "Accomodation", value: "select" },
    ...accomodationsName,
  ];

  let roomTypes = [];
  if (rooms.length) {
    rooms.forEach((room) => {
      if (room.accomodationId === tripData.accomodationId && !room.taken) {
        roomTypes.push({ name: room.roomType, value: room.id });
      }
    });
  }
  const roomsOptions = [{ name: "Room", value: "select" }, ...roomTypes];

  const [locationError, setLocationError] = useState({
    isValid: true,
    message: "",
  });
  const [accomodationError, setAccomodationError] = useState({
    isValid: true,
    message: "",
  });
  const [roomError, setRoomError] = useState({
    isValid: true,
    message: "",
  });
  const [leavingFromError, setLeavingFromError] = useState({
    isValid: true,
    message: "",
  });
  const [reasonError, setReasonError] = useState({
    isValid: true,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "location":
        let location = value != "select";
        setLocationError({
          ...locationError,
          ["isValid"]: location ? true : false,
          ["message"]: location ? "" : "Please choose a location.",
        });
        break;
      case "accomodation":
        let accomodation = value != "select";
        setAccomodationError({
          ...accomodationError,
          ["isValid"]: accomodation ? true : false,
          ["message"]: accomodation ? "" : "Please choose an accomodation.",
        });
        break;
      case "room":
        let room = value != "select";
        setRoomError({
          ...roomError,
          ["isValid"]: room ? true : false,
          ["message"]: room ? "" : "Please choose a room.",
        });
        break;
      case "leavingFrom":
        let leavingFrom = value.length != 0;
        setLeavingFromError({
          ...leavingFromError,
          ["isValid"]: leavingFrom ? true : false,
          ["message"]: leavingFrom ? "" : "Please enter your address.",
        });
        break;
      case "reason":
        let reason = value.length != 0;
        setReasonError({
          ...reasonError,
          ["isValid"]: reason ? true : false,
          ["message"]: reason ? "" : "Please enter your travel reason.",
        });
        break;
      default:
        break;
    }
  };

  const jwtToken = ("; " + document.cookie).split(`; jwt=`).pop().split(";")[0];

  const submitRequest = async (e) => {
    e.preventDefault();

    if (tripData.goingTo === null)
      return handleChange({ target: { name: "location", value: "select" } });
    if (tripData.accomodationId === null)
      return handleChange({
        target: { name: "accomodation", value: "select" },
      });
    if (tripData.roomId === null)
      return handleChange({
        target: { name: "room", value: "select" },
      });
    if (tripData.leavingFrom == "")
      return handleChange({
        target: { name: "leavingFrom", value: "" },
      });
    if (tripData.travelReason === "")
      return handleChange({
        target: { name: "reason", value: "" },
      });

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.API_URL}/user/trip`,
        tripData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setIsLoading(false);
      setAlert({
        message: res.statusText,
        status: res.status,
      });
      setTimeout(() => {
        setAlert({ message: "" });
      }, 2200);
      if (res.status === 201) {
        setTripData({
          leavingFrom: "",
          goingTo: "",
          travelDate: null,
          returnDate: null,
          travelReason: "",
          accomodationId: null,
          roomId: null,
        });
      }
    } catch (error) {
      setIsLoading(false);
      setAlert({
        message: error.response.data.message,
        status: error.response.status,
      });
      setTimeout(() => {
        setAlert({ message: "" });
      }, 2200);
    }
  };

  return (
    <div className="create-request">
      <div className="slice-a-signup slice-a">
        <div className="welcome-text">
          <h1>Create trip request.</h1>
          <p>
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to
          </p>
        </div>
        <img style={{ paddingTop: 80 }} src={svg} alt="Login svg" />
      </div>
      <div className="slice-b">
        <img src={barefootLogo} className="logo" alt="Barefoot logo" />
        <div className="form-content">
          <h2>Fill the trip request information</h2>
          <p>
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to
          </p>

          <form action="" className="reg-form" onSubmit={submitRequest}>
            <div className="input-align">
              <Select
                inputFor="location"
                parentClass="form-group input-left"
                childClass={`input-group input-resize ${
                  locationError.isValid ? "" : "errorBorder"
                }`}
                name="location"
                options={locationOptions}
                onBlur={(e) => handleChange(e)}
                onChange={(e) => {
                  setTripData({
                    ...tripData,
                    goingTo: parseInt(e.target.value),
                  });
                }}
                value={tripData.goingTo}
                errorClass="error"
                errorMessage={
                  locationError.isValid ? "" : locationError.message
                }
              />
              <div className="date-picker">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Travel Date"
                    name="travelDate"
                    value={tripData.travelDate}
                    onChange={(newValue) => {
                      setTripData({
                        ...tripData,
                        travelDate: newValue,
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        size="10"
                        {...params}
                        className="calenderInput"
                        sx={{
                          svg: { paddingBottom: 5, marginLeft: "auto" },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="input-align">
              <Select
                inputFor="accomodation"
                value={tripData.accomodationId}
                parentClass="form-group input-left"
                childClass={`input-group input-resize ${
                  accomodationError.isValid ? "" : "errorBorder"
                }`}
                name="accomodation"
                errorClass="error"
                errorMessage={
                  accomodationError.isValid ? "" : accomodationError.message
                }
                options={accomodationOptions}
                onBlur={(e) => handleChange(e)}
                onChange={(e) => {
                  setTripData({
                    ...tripData,
                    accomodationId: parseInt(e.target.value),
                  });
                }}
              />
              <div className="date-picker">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Return Date"
                    value={tripData.returnDate}
                    onChange={(newValue) => {
                      setTripData({
                        ...tripData,
                        returnDate: newValue,
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        size="10"
                        {...params}
                        className="calenderInput"
                        sx={{
                          svg: { paddingBottom: 5, marginLeft: "auto" },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="input-align">
              <Select
                inputFor="room"
                value={tripData.roomId}
                parentClass="form-group input-left"
                childClass={`input-group input-resize ${
                  roomError.isValid ? "" : "errorBorder"
                }`}
                name="room"
                errorClass="error"
                errorMessage={roomError.isValid ? "" : roomError.message}
                options={roomsOptions}
                onBlur={(e) => handleChange(e)}
                onChange={(e) => {
                  setTripData({
                    ...tripData,
                    roomId: parseInt(e.target.value),
                  });
                }}
              />
              <Input
                inputFor="leavingfrom"
                value={tripData.leavingFrom}
                parentClass="form-group input-left"
                childClass={`input-group input-resize ${
                  leavingFromError.isValid ? "" : "errorBorder"
                }`}
                placeholder="Leaving from"
                type="text"
                name="leavingFrom"
                errorClass="error"
                onChange={(e) => {
                  setTripData({
                    ...tripData,
                    leavingFrom: e.target.value,
                  });
                }}
                onBlur={(e) => {
                  handleChange(e);
                  if (e.target.value.length != 0) {
                    setLeavingFromError({
                      isValid: true,
                      message: "",
                    });
                  }
                }}
                errorMessage={
                  leavingFromError.isValid ? "" : leavingFromError.message
                }
              />
            </div>
            <div className="textarea-reason">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={4}
                value={tripData.travelReason}
                className={`textarea ${
                  reasonError.isValid ? "" : "errorBorder"
                }`}
                name="reason"
                placeholder="Travel reason"
                onBlur={(e) => {
                  handleChange(e);
                  if (e.target.value.length != 0) {
                    setReasonError({
                      isValid: true,
                      message: "",
                    });
                  }
                }}
                onChange={(e) => {
                  setTripData({
                    ...tripData,
                    travelReason: e.target.value,
                  });
                }}
              />
              <p
                style={{ display: reasonError.isValid ? "none" : "block" }}
                className="error"
              >
                {reasonError.message}
              </p>
            </div>
            {alert.message && (
              <div style={{ paddingTop: 20 }}>
                <Alert
                  variant="filled"
                  severity={
                    alert.status === 200 || alert.status === 201
                      ? "success"
                      : "error"
                  }
                  sx={{ width: "40%", marginLeft: "auto", marginRight: 6 }}
                >
                  {alert.message}
                </Alert>
              </div>
            )}
            <Button
              type="submit"
              variant={isLoading ? "outlined" : "contained"}
              style={{ marginRight: 44 }}
            >
              {isLoading ? "Loading.." : "Create"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;
