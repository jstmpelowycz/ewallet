import React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {colors} from "./colors";

const BarChart = () => {
  const categories = useSelector((state) => state.user.userData.categories);

  return (
    <div>
      <Bar
        data={{
          labels: ["", "", "", "", ""],
          datasets: [
            {
              label: "Amount Spent",
              data: [
                categories[0].amount,
                categories[1].amount,
                categories[2].amount,
                categories[3].amount,
                categories[4].amount,
              ],
              backgroundColor: [
                ...Object.values(colors),
              ],
            },
          ],
        }}
      />
    </div>
  );
};

export default BarChart;
