import Input from "../Input";
import Button from "../Button";
import React, {useRef} from "react";
import {userActions} from "../../../store/user";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const insertAt = (array, index, ...elements) => {
  array.splice(index, 0, ...elements);
};

export const AddExpense = (props) => {
  const {
    onAddExpense,
    className,
    user,
    metaData,
    dispatch,
    onSubmit,
  } = props;

  const expenses = useSelector(({user}) => user.expenses);
  const totalExpenses = useSelector(({user}) => user.totalExpenses);
  const id = useSelector(({user}) => user.userId.localId);
  const key = `${id}_income-total`;

  const enteredExpenseNameRef = useRef();
  const enteredExpenseAmountRef = useRef();
  const enteredCategoryRef = useRef();

  const submitForm = (event) => {
    event.preventDefault();

    const enteredAmount = enteredExpenseAmountRef.current?.value;

    const totalIncome = Number(localStorage.getItem(key));
    const hasSufficientFunds = (totalIncome - enteredAmount) >= 0

    if (!hasSufficientFunds) {
      alert("Cannot perform action – insufficient funds");
      onSubmit();
      return;
    }

    const expenseName = enteredExpenseNameRef.current?.value;
    const enteredExpenseName = expenseName.toLowerCase()[0].toUpperCase() + expenseName.slice(1);
    const enteredCategory = enteredCategoryRef.current?.value;
    const categories = user.categories.map((category) => category);

    const category = categories.find(
      (category) => category.category === enteredCategory.toLowerCase()
    );

    const categoryIndex = categories.indexOf(category);

    categories.splice(categoryIndex, 1);

    const replaceCategory = {
      amount: +category.amount + +enteredAmount,
      category: category.category,
    };

    insertAt(categories, categoryIndex, replaceCategory);

    onAddExpense((prevState) => {
      const nextState = prevState - Number(enteredAmount);

      localStorage.setItem(key, String(nextState));

      return nextState;
    });

    fetch(
      `https://trackwise-b7eaf-default-rtdb.firebaseio.com/users/${metaData.localId}.json`,
      {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          expenses: [
            ...expenses,
            {
              category: enteredCategory,
              price: enteredAmount,
              title: enteredExpenseName,
            },
          ],
          totalExpenses: totalExpenses + +enteredAmount,
          categories: categories,
        }),
      }
    )
      .then((res) => res.json())
      .then(() => {
        dispatch(
          userActions.addExpense({
            category: enteredCategory,
            price: enteredAmount,
            title: enteredExpenseName,
          })
        );
        dispatch(userActions.setTotalExpenses(+totalExpenses + +enteredAmount));
        dispatch(
          userActions.setUserData({
            ...user,
            categories: categories,
          })
        );
      });

    onSubmit();
  };

  return (
    <form
      className={className}
      onSubmit={submitForm}
    >
      <div className="confirm__container--form-input">
        <Input
          placeholder="Expense Name"
          type="text"
          ref={enteredExpenseNameRef}
          required="required"
        />
      </div>
      <div className="confirm__container--form-input">
        <Input
          type="number"
          placeholder="Expense Amount"
          ref={enteredExpenseAmountRef}
          required="required"
        />
      </div>
      <select
        name="category"
        id="category"
        ref={enteredCategoryRef}
        required
      >
        <option defaultValue hidden>
          Select a category
        </option>
        <option>Bills</option>
        <option>Groceries</option>
        <option>Transportation</option>
        <option>Luxury</option>
        <option>Other</option>
      </select>
      <Button btnClass="btn" type="submit">
        Add Expense
      </Button>
    </form>
  )
}

AddExpense.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  metaData: PropTypes.object,
  dispatch: PropTypes.func,
  onAddExpense: PropTypes.func,
  onSubmit: PropTypes.func,
}
