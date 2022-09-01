import React from "react";
import "../../styles/preloader.scss";

function PreLoader() {
  return (
    <div className="spinner">
      <span>Loading...</span>
      <div className="half-spinner"></div>
    </div>
  );
}
export function PreLoaderSmall() {
  return (
    <div className="spinner">
      <div className="half-spinner-small"></div>
    </div>
  );
}
export function PreLoaderSmallDanger() {
  return (
    <div className="spinner">
      <div className="half-spinner-small-danger"></div>
    </div>
  );
}

export default PreLoader;
