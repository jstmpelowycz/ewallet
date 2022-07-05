import React from "react";
import {PieChart} from "react-minimal-pie-chart";
import {useSelector} from "react-redux";
import {colors} from "./colors";

const PieChartDisplay = () => {
  const totalExpenses = useSelector((state) => state.user.totalExpenses);
  const categories = useSelector((state) => state.user.userData.categories);

  const valueOf = (am) => {
    const amount = +((am / totalExpenses) * 100).toFixed(2);
    return amount;
  };

  return (
    <div className="pie-chart">
      <PieChart
        startAngle={-90}
        paddingAngle={3}
        animate={true}
        animationDuration={1250}
        animationEasing={"ease"}
        data={[
          {
            title: "bills",
            value: valueOf(categories[0].amount),
            color: colors.green,
          },
          {
            title: "groceries",
            value: valueOf(categories[1].amount),
            color: colors.yellow,
          },
          {
            title: "transportation",
            value: valueOf(categories[2].amount),
            color: colors.blue,
          },
          {
            title: "luxury",
            value: valueOf(categories[3].amount),
            color: colors.bordeaux,
          },
          {
            title: "other",
            value: valueOf(categories[4].amount),
            color: colors.lightgrey,
          },
        ]}
      />
      <div className="pie-chart__donut">
        <div>
          <p>Total:</p>
          <p>
            <strong>₴{totalExpenses.toFixed(2)}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PieChartDisplay;
