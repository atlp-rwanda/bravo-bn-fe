import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "./jest.setup";

import { ErrorAlert, InfoAlert, SuccessAlert, WarnAlert } from '../components/Alerts';
import { Stack } from "@mui/material";


test("Alerts tests", async () => {

  render(<Stack  >
    { "warnMessage"  && <WarnAlert /> }
    { "infoMessage"  && <InfoAlert /> }
    { "successMessage" && <SuccessAlert/> }
    { "errorMessage" && <ErrorAlert /> }
  </Stack>);

});
