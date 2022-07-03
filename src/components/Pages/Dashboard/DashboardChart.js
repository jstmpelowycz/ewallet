import React, {useState} from "react";
import PieChart from "../../UI/Charts/PieChart";
import BarChart from "../../UI/Charts/BarChart";
import DashboardCard from "../../UI/DashboardCard";

const ChartType = {
  Pie: "pie",
  Line: "line",
}

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

const DashboardChart = () => {
  const date = new Date();
  const currentMonth = date.getMonth();

  const [chart, setChart] = useState(ChartType.Pie);

  const setPieHandler = () => {
    setChart(ChartType.Pie);
  };

  const setLineHandler = () => {
    setChart(ChartType.Line);
  };

  return (
    <DashboardCard cardClass="dashboard__chart--card">
      <div className="dashboard__chart">
        <div className="dashboard__chart-info">
          <p className="dashboard__chart-info--title">Monthly Expenses</p>
          <p className="dashboard__chart-info--date">
            {months[currentMonth][0]} 1 - {months[currentMonth][0]}{" "}
            {months[currentMonth][1]}
          </p>
        </div>

        {chart === ChartType.Pie && <PieChart/>}
        {chart === ChartType.Line && <BarChart/>}

        <div className="dashboard__chart-icons">
          <span
            className={
              chart === ChartType.Pie
                ? "fas fa-chart-pie dashboard__chart-icon active"
                : "fas fa-chart-pie dashboard__chart-icon"
            }
            onClick={setPieHandler}
          ></span>
          <span
            className={
              chart === ChartType.Line
                ? "far fa-chart-bar dashboard__chart-icon dashboard__chart-icon--bar active"
                : "far fa-chart-bar dashboard__chart-icon dashboard__chart-icon--bar"
            }
            onClick={setLineHandler}
          ></span>
        </div>
      </div>
    </DashboardCard>
  );
};

export default DashboardChart;
