import React from "react";

const DashboardLegendItem = (props) => {
  return (
    <li className="legend__item">
      <div className="legend__item--description">
        <div
          className={`legend__item--circle legend__item--circle-${props.id}`}
        ></div>
        <p>{props.category}</p>
      </div>
      <div className="legend__item--line">
        <div className="legend__item--line-through"></div>
      </div>
      <p className="legend__item--price">
        ₴{props.amount.toFixed(2)}
      </p>
    </li>
  );
};

export default DashboardLegendItem;
