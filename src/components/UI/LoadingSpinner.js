import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="loading__container">
      <div className="fas fa-circle-notch loading__container--spinner"></div>
      <p>Please wait while we fetch your data</p>
    </div>
  );
};

export default LoadingSpinner;
