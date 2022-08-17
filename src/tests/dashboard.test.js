import React from "react";
import "@testing-library/jest-dom";
import { screen, render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Users from "../components/dashboard/Users";


describe("Users table", () => {
  beforeAll(() => {
    render(
      <Router>
        
          <Users />
        
      </Router>
    );
  });
  test("User should have table", () => {
    const table = screen.getByTestId("users-table");
    expect(table).toBeInTheDocument();
  });

  test("User should have column headers", () => {
    const { container } = render(
      
        <Users />
      
    );
    const table = container.querySelector(".MuiDataGrid-columnHeader");
    expect(table).toBeInTheDocument();
  });

  test("User should have page change button", () => {
    const { container } = render(
     
        <Users />
      
    );
    const pageButton = container.querySelector(".MuiButtonBase-root");
    expect(pageButton).toBeInTheDocument();
  });

  test("User should have table body", () => {
    const { container } = render(
      
        <Users />
      
    );
    const tableBody = container.querySelector(".MuiDataGrid-main");
    expect(tableBody).toBeInTheDocument();
  });

  test("User should have table row body", () => {
    const { container } = render(
      
        <Users />
      
    );
    const rowBody = container.querySelector(".MuiDataGrid-overlay");
    expect(rowBody).toBeInTheDocument();
  });

  test("User should have text message in table row if no data", () => {
    const { container } = render(
      
        <Users />
      
    );
    const rowBody = container.querySelector(".MuiDataGrid-overlay");
    const text = "No rows";
    expect(rowBody).toHaveTextContent(text);
  });
  afterEach(cleanup);
});