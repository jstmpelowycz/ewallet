import React, { useState, Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user";
import { useHistory } from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";

const Navigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [navOpen, setNavOpen] = useState(false);

  const user = useSelector((state) => state.user.userData);
  const expenses = useSelector((state) => state.user.expenses);
  const totalExpenses = useSelector((state) => state.user.totalExpenses);
  const metaData = useSelector((state) => state.user.userId);

  const enteredExpenseRef = useRef();
  const enteredAmountRef = useRef();
  const enteredCategoryRef = useRef();

  const openNavHandler = () => {
    setNavOpen((prevState) => !prevState);
  };

  const logoutUserHandler = () => {
    dispatch(userActions.logoutUser());
    localStorage.removeItem("localId");

    history.replace("/");
  };

  const submitForm = (e) => {
    e.preventDefault();

    const expense = enteredExpenseRef.current.value;
    const enteredExpense =
      expense.toLowerCase()[0].toUpperCase() + expense.slice(1);
    const enteredAmount = enteredAmountRef.current.value;
    const enteredCategory = enteredCategoryRef.current.value;

    const insertAt = (array, index, ...elements) => {
      array.splice(index, 0, ...elements);
    };
    const categories = user.categories.map((category) => category);
    const category = categories.find(
      (category) => category.category === enteredCategory.toLowerCase()
    );
    const indexOf = categories.indexOf(category);
    categories.splice(indexOf, 1);

    const replaceCategory = {
      amount: +category.amount + +enteredAmount,
      category: category.category,
    };
    insertAt(categories, indexOf, replaceCategory);

    fetch(
      `https://trackwise-b7eaf-default-rtdb.firebaseio.com/users/${metaData.localId}.json`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expenses: [
            ...expenses,
            {
              category: enteredCategory,
              price: enteredAmount,
              title: enteredExpense,
            },
          ],
          totalExpenses: totalExpenses + +enteredAmount,
          categories: categories,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then(() => {
        dispatch(
          userActions.addExpense({
            category: enteredCategory,
            price: enteredAmount,
            title: enteredExpense,
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

    // fetch(
    //   `https://trackwise-b7eaf-default-rtdb.firebaseio.com/users/${metaData.localId}.json`,
    //   {
    //     method: "PATCH",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       totalExpenses: totalExpenses + +enteredAmount,
    //     }),
    //   }
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then(() => {
    //     dispatch(userActions.setTotalExpenses(+totalExpenses + +enteredAmount));
    //   });

    // fetch(
    //   `https://trackwise-b7eaf-default-rtdb.firebaseio.com/users/${metaData.localId}.json`,
    //   {
    //     method: "PATCH",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       categories: categories,
    //     }),
    //   }
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then(() => {
    //     dispatch(
    //       userActions.setUserData({
    //         ...user,
    //         categories: categories,
    //       })
    //     );
    //   });
  };

  return (
    <nav className="dashboard__nav">
      <div className="dashboard__nav--info">
        <p className="dashboard__nav--user">{user.firstName}'s Dashboard</p>
        {!navOpen && (
          <p className="dashboard__nav--dropdown" onClick={openNavHandler}>
            +
          </p>
        )}
        {navOpen && (
          <p className="dashboard__nav--dropdown" onClick={openNavHandler}>
            -
          </p>
        )}
      </div>
      {navOpen && (
        <Fragment>
          <form className="dashboard__nav--form" onSubmit={submitForm}>
            <div className="confirm__container--form-input">
              <Input
                placeholder="Expense Name"
                ref={enteredExpenseRef}
                required="required"
              />
            </div>
            <div className="confirm__container--form-input">
              <Input
                placeholder="Expense Amount"
                ref={enteredAmountRef}
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

          <Button btnClass="btn logout" onClick={logoutUserHandler}>
            Logout
          </Button>

          <div className="dashboard__nav-settings">
            <i className="fas fa-cog dashboard__nav-settings--icon"></i>
          </div>
        </Fragment>
      )}
    </nav>
  );
};

export default Navigation;
