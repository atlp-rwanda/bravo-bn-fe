import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "./jest.setup";
import { UpdateModal } from '../components/Models';


test("Update modal", async () => {

  render(<UpdateModal  open={true} />);

});
