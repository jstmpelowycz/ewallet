import React, { useState, useEffect } from "react";
import DashboardChart from "./DashboardChart";
import DashboardLegend from "./DashboardLegend";
import DashboardExpenses from "./DashboardExpenses";
import Navigation from "../../UI/Navigation";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user";
import { Fragment } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.userId.localId);

  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetch("https://trackwise-b7eaf-default-rtdb.firebaseio.com/users.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const user = data[id];
        console.log(user);
        dispatch(userActions.setUserData(user));
        dispatch(userActions.setTotalExpenses(user.totalExpenses));
        setIsLoading(false);
        setDataLoaded(true);
        if (user.expenses) {
          dispatch(userActions.setAllExpenses(user.expenses));
        } else {
          return;
        }
      });
  }, [dispatch, id]);

  return (
    <div className="dashboard">
      {isLoading && <LoadingSpinner />}
      {dataLoaded && (
        <Fragment>
          <Navigation />
          <div className="dashboard__larger-screen">
            <DashboardChart />
            <DashboardLegend />
          </div>
          <DashboardExpenses />
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
