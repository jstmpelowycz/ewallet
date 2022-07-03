import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../../store/user";
import {useHistory} from "react-router-dom";
import Button from "../Button";
import {AddIncome} from "./AddIncome";
import {AddExpense} from "./AddExpense";
import PropTypes from "prop-types";

const Navigation = ({totalIncome, setTotalIncome}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(({user}) => user.userData);
  const metaData = useSelector(({user}) => user.userId);

  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [addIncomeOpen, setAddIncomeOpen] = useState(false);

  const handleAddExpenseOpen = () => {
    if (addIncomeOpen) {
      setAddIncomeOpen((prevState) => !prevState);
    }

    setAddExpenseOpen((prevState) => !prevState);
  };

  const handleAddIncomeOpen = () => {
    if (addExpenseOpen) {
      setAddExpenseOpen((prevState) => !prevState);
    }

    setAddIncomeOpen((prevState) => !prevState);
  }

  const closeAddExpense = () => {
    setAddExpenseOpen(false);
  }

  const closeAddIncome = () => {
    setAddIncomeOpen(false);
  }

  const logoutUserHandler = () => {
    dispatch(userActions.logoutUser({}));
    localStorage.removeItem("localId");
    history.replace("/");
  };

  return (
    <nav className="dashboard__nav">
      <div className="dashboard__nav-info">
        <p className="dashboard__nav-user">
          {userData.firstName}'s Dashboard
        </p>

        <div className="dashboard__nav-controls">
          <Button
            applyDefault={false}
            onClick={handleAddIncomeOpen}
            btnClass={
              `dashboard__nav-dropdown${addIncomeOpen ? '--open' : ''} `
              + 'dashboard__nav-dropdown'
            }
          >
            Add Income
          </Button>

          <Button
            applyDefault={false}
            onClick={handleAddExpenseOpen}
            btnClass={
              `dashboard__nav-dropdown${addExpenseOpen ? '--open' : ''} `
              + 'dashboard__nav-dropdown'
            }
          >
            Add Expense
          </Button>

          <Button
            btnClass="btn logout"
            onClick={logoutUserHandler}
          >
            Logout
          </Button>
        </div>
      </div>

      {addIncomeOpen && (
        <AddIncome
          className="dashboard__nav-form"
          setTotalIncome={setTotalIncome}
          onSubmit={closeAddIncome}
        />
      )}

      {addExpenseOpen && (
        <AddExpense
          className="dashboard__nav-form"
          user={userData}
          metaData={metaData}
          dispatch={dispatch}
          totalIncome={totalIncome}
          onAddExpense={setTotalIncome}
          onSubmit={closeAddExpense}
        />
      )}
    </nav>
  );
};

Navigation.propTypes = {
  totalIncome: PropTypes.number,
  setTotalIncome: PropTypes.func,
}

export default Navigation;
