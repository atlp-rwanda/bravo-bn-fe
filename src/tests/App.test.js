import React from "react";
import renderer from "react-test-renderer";
import App from "../components/App";
import { store } from "../redux/store";
import { Provider } from "react-redux";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        {" "}
        <App />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
