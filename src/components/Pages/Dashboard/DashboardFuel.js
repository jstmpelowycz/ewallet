import 'bootstrap/dist/css/bootstrap.css';
import React, {Fragment, useRef, useState} from "react";
import Input from "../../UI/Input";
import DashboardCard from "../../UI/DashboardCard";
import Button from "../../UI/Button";
import ProgressBar from 'react-bootstrap/ProgressBar'

const DashboardFuel = () => {
  const [tax, setTax] = useState(0);
  const [listPrice, setListPrice] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const enteredPriceRef = useRef();
  const enteredTypeRef = useRef();

  let AKZ;

  const calculateTax = (value) => {
    if (!value) {
      return 0;
    }

    const n = value * 0.083;
    const pdv = value * 0.17;
    const akz = value * AKZ;
    const tax = Math.round((n + pdv + akz) * 100) / 100;

    setListPrice(Math.round((value - tax) * 100) / 100);
    setShowResults(true);

    return tax;
  };

  const submitForm = (event) => {
    event.preventDefault();

    const enteredPrice = enteredPriceRef.current?.value;
    const enteredType = enteredTypeRef.current?.value;

    switch (enteredType) {
      case "Diesel":
        AKZ = 0.078;
        break;
      case "Gas":
        AKZ = 0.041;
        break;
      default:
        AKZ = 0.132;
    }

    const taxCalculated = calculateTax(Number(enteredPrice));

    setTax(taxCalculated);
  }

  const Details = () => (
    <div className="confirm__container--form-results">
      <div className="confirm__container--form-result">
        <h3 style={{marginTop: "-8px"}}>
          Results:
        </h3>
      </div>
      <div className="confirm__container--form-progressBar">
        <ProgressBar
          style={{
            height: "38px",
            fontSize: "1.85rem",
            fontFamily: "SansSerif",
            fontWeight: "bold"
          }}
        >
          <ProgressBar
            style={{fontFamily: 'Poppins'}}
            striped
            variant="success"
            now={(listPrice * 100) / (tax + listPrice)}
            key='key-pb_1'
            label={`List price: ₴${listPrice}`}
          />
          <ProgressBar
            style={{fontFamily: 'Poppins'}}
            striped
            variant="danger"
            now={(tax * 100) / (tax + listPrice)}
            key='key-pb_2'
            label={`Taxes: ₴${tax}`}
          />
        </ProgressBar>
      </div>
    </div>
  )


  return (
    <DashboardCard title="Calculate your fuel taxes">
      <Fragment>
        <form
          className="dashboard__taxes--form"
          onSubmit={submitForm}
        >
          <div className="confirm__container--form-inputSalary">
            <Input
              placeholder="How much does a full tank cost?"
              type="number"
              ref={enteredPriceRef}
              required="required"
              max="10000"
              min="1"
            />

            <select
              name="type"
              id="type"
              ref={enteredTypeRef}
              required
            >
              <option defaultValue>A95</option>
              <option>A92</option>
              <option>Diesel</option>
              <option>Gas</option>
            </select>
          </div>

          <Button btnClass="btn" type="submit">Calculate</Button>
        </form>

        {showResults && <Details/>}
      </Fragment>
    </DashboardCard>
  );
};

export default DashboardFuel;
