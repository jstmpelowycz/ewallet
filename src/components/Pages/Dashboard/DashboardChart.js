import React, { useState } from "react";
import PieChart from "../../UI/Charts/PieChart";
import BarChart from "../../UI/Charts/BarChart";
import DashboardCard from "../../UI/DashboardCard";

const DashboardChart = () => {
  const [chart, setChart] = useState("pie");

  const date = new Date();
  const curMonth = date.getMonth();
  const months = [
    ["Jan", 31],
    ["Feb", 28],
    ["Mar", 31],
    ["Apr", 30],
    ["May", 31],
    ["Jun", 30],
    ["Jul", 31],
    ["Aug", 31],
    ["Sep", 30],
    ["Oct", 31],
    ["Nov", 30],
    ["Dec", 31],
  ];

  const setPieHandler = () => {
    setChart("pie");
  };

  const setLineHandler = () => {
    setChart("line");
  };

  return (
    <DashboardCard cardClass="dashboard__chart--card">
      <div className="dashboard__chart">
        <div className="dashboard__chart-info">
          <p className="dashboard__chart-info--title">Monthly Expenses</p>
          <p className="dashboard__chart-info--date">
            {months[curMonth][0]} 1 - {months[curMonth][0]}{" "}
            {months[curMonth][1]}
          </p>
        </div>
        {chart === "pie" && <PieChart />}
        {chart === "line" && <BarChart />}
        <div className="dashboard__chart-icons">
          <i
            className={
              chart === "pie"
                ? "fas fa-chart-pie dashboard__chart-icon active"
                : "fas fa-chart-pie dashboard__chart-icon"
            }
            onClick={setPieHandler}
          ></i>
          <i
            className={
              chart === "line"
                ? "far fa-chart-bar dashboard__chart-icon dashboard__chart-icon--bar active"
                : "far fa-chart-bar dashboard__chart-icon dashboard__chart-icon--bar"
            }
            onClick={setLineHandler}
          ></i>
        </div>
      </div>
    </DashboardCard>
  );
};

export default DashboardChart;
