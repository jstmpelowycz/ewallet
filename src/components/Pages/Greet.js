import React from "react";
import { useHistory } from "react-router-dom";

const Greet = () => {
  const history = useHistory();

  setTimeout(() => {
    history.push("/dashboard");
  }, 1500);

  return (
    <div className="greeting">
      <p>Welcome Back!</p>

      <div className="greeting__bubble">
        <div className="greeting__bubble--main"></div>
        <div className="greeting__bubble--secondary"></div>
      </div>
    </div>
  );
};

export default Greet;
