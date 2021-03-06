import React from "react";
import DashboardCard from "../../UI/DashboardCard";
import DashboardExpenseItem from "./DashboardExpenseItem";
import {useSelector} from "react-redux";
import {JsonToExcel as JSONToExcel} from "react-json-to-excel";

const JSONToExcelButton = (props) => {
  return (
    <JSONToExcel
      data={props.expenses}
      fileName={`Report-${new Date().toLocaleString("en-US", {month: "long"})}${new Date().getFullYear()}`}
      btnClassName="primary-btn primary-btn--excel"
    />
  );
}

const DashboardExpenses = () => {
  const expenses = useSelector((state) => state?.user.expenses);
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
      <JSONToExcelButton expenses={expenses}></JSONToExcelButton>
    </DashboardCard>
  );
};

export default DashboardExpenses;
