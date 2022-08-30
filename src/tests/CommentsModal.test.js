import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "./jest.setup";
import { CommentsModal } from '../components/Models';


test("Update modal", async () => {

  render(<CommentsModal  open={true} />);

});