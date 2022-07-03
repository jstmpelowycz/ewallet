import React, { useRef } from "react";
import { useHistory } from "react-router";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useSelector } from "react-redux";

const CreateAccount = () => {
  const history = useHistory();
  const metaData = useSelector((state) => state.user.userId);

  const enteredFirstNameRef = useRef();
  const enteredLastNameRef = useRef();
  const enteredAgeRef = useRef();

  const submitForm = (event) => {
    event.preventDefault();

    const enteredFirstName = enteredFirstNameRef.current?.value;
    const enteredLastName = enteredLastNameRef.current?.value;
    const enteredAge = enteredAgeRef.current?.value;

    fetch(
      `https://trackwise-b7eaf-default-rtdb.firebaseio.com/users/${metaData.localId}.json`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: enteredFirstName,
          lastName: enteredLastName,
          age: enteredAge,
          email: metaData.email,
          categories: [
            {
              category: "bills",
              amount: 0,
            },
            {
              category: "groceries",
              amount: 0,
            },
            {
              category: "transportation",
              amount: 0,
            },
            {
              category: "luxury",
              amount: 0,
            },
            {
              category: "other",
              amount: 0,
            },
          ],
          totalExpenses: 0,
        }),
      }
    ).catch(error => console.log(error));

    history.push("/greet");
  };

  return (
    <div className="confirm">
      <div className="confirm__container">
        <p className="confirm__container--p">
          Sign In to Your Account
        </p>
        <form
          className="confirm__container--form"
          onSubmit={submitForm}
        >
          <div className="confirm__container--form-input">
            <Input
              type="text"
              placeholder="First Name"
              required="required"
              ref={enteredFirstNameRef}
              autoFocus={"autoFocus"}
            />
          </div>

          <div className="confirm__container--form-input">
            <Input
              type="text"
              placeholder="Last Name (optional)"
              ref={enteredLastNameRef}
            />
          </div>

          <div className="confirm__container--form-input">
            <Input
              type="number"
              min="0"
              max="100"
              placeholder="Age (optional)"
              ref={enteredAgeRef}
            />
          </div>

          <div className="confirm__container--dropdown">
            <select name="goals" id="goals" required>
              <option defaultValue hidden>
                What are your goals with this app?
              </option>

              <option>Better budget managing</option>
              <option>Save money over a longer period of time</option>
              <option>Fill in for future choice</option>
              <option>Another fill in for another future choice</option>
              <option>Other</option>
            </select>
          </div>

          <Button type="submit">Create Account</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
