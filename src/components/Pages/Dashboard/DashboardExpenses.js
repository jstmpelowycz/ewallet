import React from "react";
import DashboardCard from "../../UI/DashboardCard";
import DashboardExpenseItem from "./DashboardExpenseItem";
import { useSelector } from "react-redux";

const DashboardExpenses = () => {
  const expenses = useSelector((state) => state.user.expenses);
  const reversed = expenses.map((item) => item).reverse();
  console.log(reversed);

  return (
    <DashboardCard title="Expenses" cardClass="expense">
      {reversed.map((expense) => (
        <DashboardExpenseItem
          title={expense.title}
          price={expense.price}
          category={expense.category}
        />
      ))}
    </DashboardCard>
  );
};

export default DashboardExpenses;
