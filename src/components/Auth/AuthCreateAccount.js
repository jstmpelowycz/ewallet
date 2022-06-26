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

  const isEqual =
    password === confirm && password.length > 0 && confirm.length > 0;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPassInputRef = useRef();

  const passwordValue = (e) => {
    setPassword(e.target.value);
  };

  const confirmValue = (e) => {
    setConfirm(e.target.value);
  };

  const passwordVisibility = (prevState) => {
    setPasswordVisible((prevState) => !prevState);
  };

  const confirmVisibility = (prevState) => {
    setConfirmVisible((prevState) => !prevState);
  };

  const submitForm = (e) => {
    e.preventDefault();

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
            <i className="fas fa-at icon"></i>
            <Input
              type="email"
              placeholder="Email"
              ref={emailInputRef}
              required="required"
              autoFocus={"autoFocus"}
            />
          </div>
          <div className="confirm__container--form-input">
            <i className="fas fa-lock icon"></i>
            <Input
              type={!passwordVisible ? "password" : "text"}
              placeholder="Password"
              ref={passwordInputRef}
              required="required"
              onChange={passwordValue}
              value={password}
            />
            {password.length > 0 && !passwordVisible && (
              <i className="far fa-eye icon" onClick={passwordVisibility}></i>
            )}
            {password.length > 0 && passwordVisible && (
              <i
                className="fas fa-eye icon test"
                onClick={passwordVisibility}
              ></i>
            )}
          </div>
          <div className="confirm__container--form-input">
            {!isEqual && <i className="fas fa-lock-open icon"></i>}
            {isEqual && <i className="fas fa-lock icon"></i>}
            <Input
              type={!confirmVisible ? "password" : "text"}
              placeholder="Confirm Password"
              ref={confirmPassInputRef}
              required="required"
              onChange={confirmValue}
              value={confirm}
            />
            {confirm.length > 0 && !confirmVisible && (
              <i className="far fa-eye icon" onClick={confirmVisibility}></i>
            )}
            {confirm.length > 0 && confirmVisible && (
              <i
                className="fas fa-eye icon test"
                onClick={confirmVisibility}
              ></i>
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
