import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';

const RanderMyLocation = ({location}) => {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();
    
    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        if(location === null){
            setPosition(e.latlng);
            
            setBbox(e.bounds.toBBoxString().split(","));

        }
        else{
            setPosition(location);      
            map.flyTo(location, map.getZoom());
            setBbox(e.bounds.toBBoxString().split(","));
        }
   
      });
    }, [map]);
    return position === null ? null : (
        <Marker position={position} >
          <Popup>
            You are here. 
          </Popup>
        </Marker>
      );
}
 
export default RanderMyLocation;