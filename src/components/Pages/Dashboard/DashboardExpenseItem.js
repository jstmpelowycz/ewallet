import React from "react";

const DashboardExpenseItem = (props) => {
  return (
    <li className="expense__item">
      <div className="expense__item-description">
        <div
          className={`expense__item-tag ${props.category.toLowerCase()}`}
        ></div>
        <p className="expense__item-title">{props.title}</p>
      </div>
      <p className="expense__item-price">${props.price}</p>
    </li>
  );
};

export default DashboardExpenseItem;
