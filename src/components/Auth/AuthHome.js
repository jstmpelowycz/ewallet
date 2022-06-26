import React from "react";
import Button from "../UI/Button";
import logo from "../../img/google.png";
import { useHistory, useLocation } from "react-router-dom";

const AuthHome = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const login = () => {
    history.push(`${pathname}/login`);
  };

  const createAccount = () => {
    history.push(`${pathname}/create-account`);
  };

  return (
    <div className="auth">
      <div className="auth__attention">
        <h1 className="auth__attention--title">
          Track<span>Wise</span>
        </h1>
        <p className="auth__attention--slogan">Saving Money Should Be Fun</p>
      </div>

      <div className="auth__option">
        <div className="auth__option--container">
          <Button type="button" btnClass="auth__option--btn2">
            <div className="auth__option--google">
              <div className="auth__option--google-logo">
                <img src={logo} alt="google g" />
                <p>Sign in with Google</p>
              </div>
            </div>
          </Button>
          <Button type="button" btnClass="auth__option--btn" onClick={login}>
            Login
          </Button>
          <Button
            type="button"
            btnClass="auth__option--btn"
            onClick={createAccount}
          >
            Create Account
          </Button>
        </div>
      </div>

      <div className="auth__bubble">
        <div className="auth__bubble--main"></div>
        <div className="auth__bubble--secondary"></div>
      </div>
    </div>
  );
};

export default AuthHome;
