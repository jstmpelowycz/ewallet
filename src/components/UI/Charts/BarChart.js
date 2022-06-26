import React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

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
                "rgba(250, 40, 191, 0.35)",
                "rgba(58, 235, 75, 0.35)",
                "rgba(30, 147, 255, 0.35)",
                "rgba(243, 167, 54, 0.35)",
                "rgba(206, 210, 217, 0.35)",
              ],
              borderColor: [
                "#fa28bf",
                "#3aeb4b",
                "#1e93ff",
                "#f3a736",
                "#ced2d9",
              ],
              borderWidth: 2,
            },
          ],
        }}
      />
    </div>
  );
};

export default BarChart;
