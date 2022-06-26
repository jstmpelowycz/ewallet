import React from "react";

const DashboardCard = (props) => {
  return (
    <div className={`dashboard-card ${props.cardClass}`}>
      <p className="dashboard-card__title">{props.title}</p>
      <div className="dashboard-card__container">
        <ul>{props.children}</ul>
      </div>
    </div>
  );
};

export default DashboardCard;
