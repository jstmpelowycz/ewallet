import React from "react";
import Button from "../UI/Button";
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
          E<span>Wallet</span>
        </h1>
        <p className="auth__attention--slogan">Save Your Money Wisely</p>
      </div>

      <div className="auth__option">
        <div className="auth__option--container">
          <Button
            type="button"
            btnClass="auth__option--btn"
            onClick={login}
          >
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
    </div>
  );
};

export default AuthHome;
