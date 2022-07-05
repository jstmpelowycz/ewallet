import React, {useRef, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {confirmAuth} from "../Utilities/confirmAuth";
import {useDispatch} from "react-redux";
import {userActions} from "../../store/user";
import {useEffect} from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";

const AuthLogin = () => {
  const APIKey = "AIzaSyAmDf_ayrM-XIbiKeLlrcvW3nrxx5KxFJE";
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKey}`;
  const history = useHistory();
  const dispatch = useDispatch();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    dispatch(userActions.setUserId(user));
  }, [user, dispatch]);

  const passwordValue = (event) => {
    setPassword(event.target.value);
  };

  const passwordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitForm = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    confirmAuth(
      url,
      enteredEmail,
      enteredPassword,
      history,
      "/greet",
      setUser
    );
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
            <span className="fas fa-at icon"></span>

            <Input
              type="email"
              placeholder="Email"
              ref={emailInputRef}
              autoFocus={"autoFocus"}
            />
          </div>
          <div className="confirm__container--form-input">
            <span className="fas fa-lock icon"></span>

            <Input
              type={!passwordVisible ? "password" : "text"}
              placeholder="Password"
              ref={passwordInputRef}
              value={password}
              onChange={passwordValue}
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
          <Button type="submit">Login</Button>
        </form>

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
