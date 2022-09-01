import svg from "../assets/request_svg.svg";
import barefootLogo from "../assets/barefoot_logo.svg";
import React, { useState, useEffect } from "react";
import { TextField, Button, TextareaAutosize, Alert } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import "../styles/createRequest.scss";
import { Input, Select } from "../components/Input";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSelector } from "react-redux";

const CreateRequest = () => {
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
    passportName: "",
    passportNumber: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    status: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [toggle, setToggle] = useState(1);

  const newToken = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.login.user);

  const localData = JSON.parse(localStorage.getItem("tripData"));

  useEffect(() => {
    if (user.remember_info && localData) {
      setChecked(true);
      tripData.passportName = localData.passportName;
      tripData.passportNumber = localData.passportNumber;
    } else {
      setChecked(false);
    }
  }, [user]);

  const handleCheck = async (event) => {
    try {
      let config = {
        method: "put",
        url: `${process.env.API_URL}/user/remember-info`,
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      };

      axios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      setChecked(event.target.checked);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

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
  const [passportNameError, setPassportNameError] = useState({
    isValid: true,
    message: "",
  });
  const [passportNberError, setPassportNberError] = useState({
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
      case "passportName":
        let passportName = value.length != 0;
        setPassportNameError({
          ...passportNameError,
          ["isValid"]: passportName ? true : false,
          ["message"]: passportName ? "" : "Please enter your passport name.",
        });
        break;
      case "passportNber":
        let passportNber = value.length != 0;
        setPassportNberError({
          ...passportNberError,
          ["isValid"]: passportNber ? true : false,
          ["message"]: passportNber ? "" : "Please enter your passport number.",
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
      localStorage.setItem("tripData", JSON.stringify(tripData));
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
        navigate("/trip-requests");
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
      <div className="side-a">
        <div className="welcome-text">
          <h2>Create trip request.</h2>
          <p>
            Barefoot Nomad is an application that will enable its "Company
            Nomads" book their travel and accommodation easily
          </p>
        </div>
        <img style={{ paddingTop: 80 }} src={svg} alt="Login svg" />
      </div>
      <div className="slice-b">
        <img src={barefootLogo} className="logo" alt="Barefoot logo" />
        <div className="form-content">
          <h2>Fill the trip request information</h2>
          <p className="center-p">
            book your travel and accommodation easily and conveniently
          </p>

          {toggle === 1 && (
            <form
              action=""
              className="create-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (tripData.passportName == "")
                  return handleChange({
                    target: { name: "passportName", value: "" },
                  });
                if (tripData.passportNumber == "")
                  return handleChange({
                    target: { name: "passportNber", value: "" },
                  });
                setToggle(2);
              }}
            >
              <div className="create-input">
                <div className="form-input">
                  <Input
                    inputFor="passportName"
                    value={tripData.passportName}
                    placeholder="Passport name"
                    type="text"
                    name="PassportName"
                    errorClass="error"
                    borderClass={`${
                      passportNameError.isValid ? "" : "errorBorder"
                    }`}
                    onChange={(e) => {
                      setTripData({
                        ...tripData,
                        passportName: e.target.value,
                      });
                    }}
                    onBlur={(e) => {
                      handleChange(e);
                      if (e.target.value.length != 0) {
                        setPassportNameError({
                          isValid: true,
                          message: "",
                        });
                      }
                    }}
                    errorMessage={
                      passportNameError.isValid ? "" : passportNameError.message
                    }
                  />
                </div>
                <div className="form-input">
                  <Input
                    inputFor="passportNber"
                    value={tripData.passportNumber}
                    placeholder="Passport number"
                    type="text"
                    name="PassportNber"
                    errorClass="error"
                    borderClass={`${
                      passportNberError.isValid ? "" : "errorBorder"
                    }`}
                    onChange={(e) => {
                      setTripData({
                        ...tripData,
                        passportNumber: e.target.value,
                      });
                    }}
                    onBlur={(e) => {
                      handleChange(e);
                      if (e.target.value.length != 0) {
                        setPassportNberError({
                          isValid: true,
                          message: "",
                        });
                      }
                    }}
                    errorMessage={
                      passportNberError.isValid ? "" : passportNberError.message
                    }
                  />
                </div>
              </div>

              <div className="create-input">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleCheck}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Remember my information"
                />
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
                    sx={{ width: "40%", marginLeft: "auto" }}
                  >
                    {alert.message}
                  </Alert>
                </div>
              )}
              <div className="create-input">
                <Button
                  className="submit-btn"
                  type="submit"
                  variant={isLoading ? "outlined" : "contained"}
                >
                  Next
                </Button>
              </div>
            </form>
          )}

          {toggle === 2 && (
            <form action="" className="create-form" onSubmit={submitRequest}>
              <div className="create-input">
                <div className="form-input">
                  <Select
                    inputFor="location"
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
                    borderClass={`${
                      locationError.isValid ? "" : "errorBorder"
                    }`}
                    errorClass="error"
                    errorMessage={
                      locationError.isValid ? "" : locationError.message
                    }
                  />
                </div>
                <div className="form-input">
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
                        <TextField size="10" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className="create-input">
                <div className="form-input">
                  <Select
                    inputFor="accomodation"
                    value={tripData.accomodationId}
                    className="form-input"
                    name="accomodation"
                    borderClass={`${
                      accomodationError.isValid ? "" : "errorBorder"
                    }`}
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
                </div>
                <div className="form-input">
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
                        <TextField size="10" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className="create-input">
                <div className="form-input">
                  <Select
                    inputFor="room"
                    value={tripData.roomId}
                    name="room"
                    errorClass="error"
                    borderClass={`${roomError.isValid ? "" : "errorBorder"}`}
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
                </div>
                <div className="form-input">
                  <Input
                    inputFor="leavingfrom"
                    value={tripData.leavingFrom}
                    placeholder="Leaving from"
                    type="text"
                    name="leavingFrom"
                    errorClass="error"
                    borderClass={`${
                      leavingFromError.isValid ? "" : "errorBorder"
                    }`}
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
              </div>
              <div>
                <div className="create-input">
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={4}
                    value={tripData.travelReason}
                    className={`form-input ${
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
                </div>
                <p
                  style={{
                    marginLeft: 14,
                    display: reasonError.isValid ? "none" : "block",
                  }}
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
                    sx={{ width: "40%", marginLeft: "auto" }}
                  >
                    {alert.message}
                  </Alert>
                </div>
              )}
              <div className="create-input">
                <KeyboardBackspaceIcon
                  onClick={() => {
                    setToggle(1);
                  }}
                />
                <Button
                  className="submit-btn"
                  type="submit"
                  variant={isLoading ? "outlined" : "contained"}
                >
                  {isLoading ? "Loading.." : "Create"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;
