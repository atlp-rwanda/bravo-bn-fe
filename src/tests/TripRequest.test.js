import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "./jest.setup";
import { TripRequest } from "../components/TripRequest";

describe('Trip request render', function(){ 

test("Trip request component", async () => {
 
    const trips= [{location:'rwanda',status:'pending',commentsCount:5, accomodation:{name:'hotel',image:'image.jpg',location:'kifali',amenitiesList:['hot water']}}]

  render(<TripRequest 
    key={1} location={trips[0].location}
    status={trips[0].status}
    commentsCount = {trips[0].commentsCount}
    accomodation={trips[0].accomodation} 
    />);

});

});
