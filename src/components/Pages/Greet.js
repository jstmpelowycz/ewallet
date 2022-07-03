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
    </div>
  );
};

export default Greet;
