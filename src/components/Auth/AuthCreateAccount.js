import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import { confirmAuth } from "../Utilities/confirmAuth";

const AuthCreateAccount = () => {
  const dispatch = useDispatch();
  const APIKey = "AIzaSyAmDf_ayrM-XIbiKeLlrcvW3nrxx5KxFJE";
  const history = useHistory();

  const { path } = useRouteMatch();

  const [user, setUser] = useState({});

  useEffect(() => {
    dispatch(userActions.setUserId(user));
  }, [user, dispatch]);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const isEqual = password === confirm && (
    password.length > 0 && confirm.length > 0
  );

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPassInputRef = useRef();

  const passwordValue = (event) => {
    setPassword(event.target.value);
  };

  const confirmValue = (event) => {
    setConfirm(event.target.value);
  };

  const passwordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const confirmVisibility = () => {
    setConfirmVisible((prevState) => !prevState);
  };

  const submitForm = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;
    const enteredConfirmPass = confirmPassInputRef.current?.value;

    if (enteredConfirmPass !== enteredPassword) {
      alert("Passwords must match.");

      return;
    }

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKey}`;

    confirmAuth(
      url,
      enteredEmail,
      enteredPassword,
      history,
      `${path}/new-user`,
      setUser
    );
  };

  return (
    <div className="confirm">
      <div className="confirm__container">
        <p className="confirm__container--p">Create New Account</p>
        <form className="confirm__container--form" onSubmit={submitForm}>
          <div className="confirm__container--form-input">
            <span className="fas fa-at icon"></span>

            <Input
              type="email"
              placeholder="Email"
              ref={emailInputRef}
              required="required"
              autoFocus={"autoFocus"}
            />
          </div>
          <div className="confirm__container--form-input">
            <span className="fas fa-lock icon"></span>

            <Input
              type={!passwordVisible ? "password" : "text"}
              onChange={passwordValue}
              ref={passwordInputRef}
              value={password}
              placeholder="Password"
              required
            />

            {password.length > 0 && !passwordVisible && (
              <span
                className="far fa-eye icon"
                onClick={passwordVisibility}
              ></span>
            )}

            {password.length > 0 && passwordVisible && (
              <span
                className="fas fa-eye icon test"
                onClick={passwordVisibility}
              ></span>
            )}
          </div>

          <div className="confirm__container--form-input">
            {!isEqual && (
              <span className="fas fa-lock-open icon"></span>
            )}

            {isEqual && (
              <span className="fas fa-lock icon"></span>
            )}

            <Input
              type={!confirmVisible ? "password" : "text"}
              ref={confirmPassInputRef}
              onChange={confirmValue}
              placeholder="Confirm Password"
              value={confirm}
              required
            />

            {confirm.length > 0 && !confirmVisible && (
              <span
                className="far fa-eye icon"
                onClick={confirmVisibility}
              ></span>
            )}

            {confirm.length > 0 && confirmVisible && (
              <span
                className="fas fa-eye icon test"
                onClick={confirmVisibility}
              ></span>
            )}

          </div>
          <Button type="submit">Create Account</Button>
        </form>

        <p className="confirm__change-auth">
          Already have an account?{" "}

          <Link to="/auth/login">
            <span>Sign in here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthCreateAccount;
