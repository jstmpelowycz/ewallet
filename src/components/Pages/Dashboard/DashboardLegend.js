import React from "react";
import DashboardCard from "../../UI/DashboardCard";
import DashboardLegendItem from "./DashboardLegendItem";
import {useSelector} from "react-redux";

const DashboardLegend = () => {
  const items = useSelector(({user}) => user.userData.categories);

  return (
    <DashboardCard title="Legend" cardClass="dashboard__legend">
      {items.map((item, i) => (
        <DashboardLegendItem
          key={item.category}
          category={
            item.category[0].toUpperCase() +
            item.category.slice(1, item.category.length)
          }
          amount={item.amount}
          id={i + 1}
        />
      ))}
    </DashboardCard>
  );
};

export default DashboardLegend;
