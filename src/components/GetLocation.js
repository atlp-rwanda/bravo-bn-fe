import React from "react";
import { useMapEvents, Marker, Popup } from "react-leaflet";

export const  LocationMarker = ({setPosition,position}) =>{
 
  const map = useMapEvents({
    click(e) {
        setPosition(e.latlng);
    },
  
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

