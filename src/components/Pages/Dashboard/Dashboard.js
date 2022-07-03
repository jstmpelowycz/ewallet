import React, {useState, useEffect} from "react";
import DashboardChart from "./DashboardChart";
import DashboardLegend from "./DashboardLegend";
import DashboardExpenses from "./DashboardExpenses";
import Navigation from "../../UI/Navigation/Navigation";
import LoadingSpinner from "../../UI/LoadingSpinner";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../../store/user";
import {Fragment} from "react";
import DashboardTaxes from "./DashboardTaxes";

const Dashboard = () => {
  const dispatch = useDispatch();
  const id = useSelector(({user}) => user.userId.localId);

  const key = `${id}_income-total`

  let initialTotalIncome;

  if (localStorage.getItem(key) === null) {
    initialTotalIncome = 0;
    localStorage.setItem(key, String(initialTotalIncome));
  } else {
    initialTotalIncome = Number(localStorage.getItem(key));
  }

  const [totalIncome, setTotalIncome] = useState(initialTotalIncome);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetch("https://trackwise-b7eaf-default-rtdb.firebaseio.com/users.json")
      .then((response) => response.json())
      .then((data) => {
        const user = data[id];

        dispatch(userActions.setUserData(user));
        dispatch(userActions.setTotalExpenses(user.totalExpenses));

        setIsLoading(false);
        setDataLoaded(true);

        if (user.expenses) {
          dispatch(userActions.setAllExpenses(user.expenses));
        }
      });
  }, [dispatch, id]);

  return (
    <div className="dashboard">
      {isLoading && <LoadingSpinner/>}

      {dataLoaded && (
        <Fragment>
          <Navigation
            setTotalIncome={setTotalIncome}
          />

          <div className="dashboard__income">
            <p className="dashboard__income-amount">
              Total Income: ${totalIncome}
            </p>
          </div>

          <div className="dashboard__view">
            <DashboardChart/>
            <DashboardLegend/>
          </div>

          <DashboardExpenses/>
          <DashboardTaxes />
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
