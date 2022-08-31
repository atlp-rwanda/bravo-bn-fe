import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LocationMarker } from "./GetLocation";

function Map(props) {
  const [current, setCurrent] = useState([-1.9504946, 30.0549678]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((coords) => {
      const { latitude, longitude } = coords.coords;
      setCurrent([latitude, longitude]);
      props.setCurrentLocation([latitude, longitude]);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width:"100%",
        height: "300px",
        cursor: "pointer",
      }}
    >
      <div className="leaflet-container" style={{ height: "300px" }}>
        <MapContainer
          center={current}
          whenCreated={setCurrent}
          zoom={15}
          scrollWheelZoom={false}
        >
          <LocationMarker
            setPosition={props.setPosition}
            position={props.position}
          />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
}
export default Map;
