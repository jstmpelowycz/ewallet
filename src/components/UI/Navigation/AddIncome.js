import React, {useRef} from "react";
import Input from "../Input";
import Button from "../Button";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

export const AddIncome = (props) => {
  const {
    className,
    setTotalIncome,
    onSubmit,
  } = props;

  const incomeAmountRef = useRef();
  const id = useSelector(({user}) => user.userId.localId);
  const key = `${id}_income-total`;

  const submitForm = (event) => {
    event.preventDefault();

    const enteredIncomeAmount = incomeAmountRef.current?.value;

    setTotalIncome((prevState = Number(localStorage.getItem(key))) => {
      const nextState = prevState + Number(enteredIncomeAmount);

      localStorage.setItem(key, String(nextState));

      return nextState;
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
          type="number"
          ref={incomeAmountRef}
          placeholder="Income Amount"
          required
        />
      </div>
      <Button btnClass="btn" type="submit">
        Add Income
      </Button>
    </form>
  )
};

AddIncome.propTypes = {
  className: PropTypes.string,
  setTotalIncome: PropTypes.func,
  onSubmit: PropTypes.func,
};
