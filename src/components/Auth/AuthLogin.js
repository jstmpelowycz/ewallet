import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { confirmAuth } from "../Utilities/confirmAuth";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import { useEffect } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";

const AuthLogin = () => {
  const APIKey = "AIzaSyAmDf_ayrM-XIbiKeLlrcvW3nrxx5KxFJE";
  const history = useHistory();
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.setUserId(user));
  }, [user, dispatch]);

  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const passwordValue = (e) => {
    setPassword(e.target.value);
  };

  const passwordVisibility = (prevState) => {
    setPasswordVisible((prevState) => !prevState);
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitForm = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKey}`;

    confirmAuth(url, enteredEmail, enteredPassword, history, "/greet", setUser);
  };

  return (
    <div className="confirm">
      <div className="confirm__container">
        <p className="confirm__container--p">Sign In to Your Account</p>
        <form className="confirm__container--form" onSubmit={submitForm}>
          <div className="confirm__container--form-input">
            <i className="fas fa-at icon"></i>
            <Input
              type="email"
              placeholder="Email"
              ref={emailInputRef}
              autoFocus={"autoFocus"}
            />
          </div>
          <div className="confirm__container--form-input">
            <i className="fas fa-lock icon"></i>
            <Input
              type={!passwordVisible ? "password" : "text"}
              placeholder="Password"
              ref={passwordInputRef}
              value={password}
              onChange={passwordValue}
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
          <Button type="submit">Login</Button>
        </form>
        <p className="confirm__forgot-password">Forgot Password?</p>
        <p className="confirm__change-auth">
          Don't have an account?{" "}
          <Link to="/auth/create-account">
            <span>Sign up here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLogin;
