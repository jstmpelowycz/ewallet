import React, {Fragment, useRef, useState} from "react";
import Input from "../../UI/Input";
import DashboardCard from "../../UI/DashboardCard";
import Button from "../../UI/Button";
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.css';


const DashboardTaxes = (props) => {
  const [tax, setTax] = useState(0);
  const [esf, setESF] = useState(0);
  const [pdfo, setPDFO] = useState(0);
  const [vz, setVZ] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const enteredSalaryRef = useRef();

  const submitForm = (event) => {
    event.preventDefault();

    const enteredSalary = enteredSalaryRef.current?.value;
    const taxCalculated = calculate(Number(enteredSalary));

    setTax(taxCalculated);
  }

  const calculate = (value) => {
    if (!value) {
      return 0;
    }

    const pdfo = value * 0.18;
    const vz = value * 0.015;
    const esf = value < 6500 ? 1430 : value * 0.22;
    const tax = Math.round((esf + pdfo + vz) * 100) / 100;

    setESF(Math.round((100 * esf) / tax));
    setPDFO(Math.round((100 * pdfo) / tax));
    setVZ(Math.round((100 * vz) / tax));
    setShowResults(true);

    return tax;
  };

  const Details = () => (
    <div className="confirm__container--form-details">
      <details>
        <summary>Details</summary>

        <div className="confirm__container--form-progressBar">
          <ProgressBar style={{height: "30px"}}>
            <ProgressBar variant="success" now={esf} key={1}/>
            <ProgressBar variant="warning" now={pdfo} key={1}/>
            <ProgressBar variant="danger" now={vz} key={1}/>
          </ProgressBar>
        </div>

        <li className="legend__taxItem">
          <div className="legend__taxItem--description">
            <div className={`legend__item--circle legend__item--circle-${6}`}></div>
            <p>ЄСВ</p>
          </div>
          <div className="legend__taxItem--line">
            <div className="legend__taxItem--line-through"></div>
          </div>
          <p className="legend__taxItem--meaning"> — (Єдиний соціальний внесок) страховий внесок з метою
            забезпечення захисту у випадках,
            передбачених законодавством
            (соціальні гарантії на випадок безробіття, нещасних випадків, пенсійне забезпечення тощо).
          </p>
        </li>
        <li className="legend__taxItem">
          <div className="legend__taxItem--description">
            <div className={`legend__item--circle legend__item--circle-${7}`}></div>
            <p>ПДФО</p>
          </div>
          <div className="legend__taxItem--line">
            <div className="legend__taxItem--line-through"></div>
          </div>
          <p className="legend__taxItem--meaning"> — (Податок з доходів фізичних осіб) загальнодержавний
            податок, що стягується з доходів
            фізичних осіб і нерезидентів, які отримують доходи з джерел їх
            походження в Україні.
          </p>
        </li>
        <li className="legend__taxItem">
          <div className="legend__taxItem--description">
            <div className={`legend__item--circle legend__item--circle-${8}`}></div>
            <p>ВЗ</p>
          </div>
          <div className="legend__taxItem--line">
            <div className="legend__taxItem--line-through"></div>
          </div>
          <p className="legend__taxItem--meaning"> — (Військовий збір) це податок, для фізичних осіб
            (резидентів і нерезидентів), який було запроваджено тимчасово для фінансування Збройних сил
            України.
          </p>
        </li>
      </details>
    </div>
  )


  return (
    <DashboardCard title="Calculate your taxes">
      <Fragment>
        <form
          className="dashboard__taxes--form"
          onSubmit={submitForm}
        >
          <div className="confirm__container--form-inputSalary">
            <Input
              placeholder="Your salary"
              type="number"
              ref={enteredSalaryRef}
              required="required"
              max="1000000"
              min="1"
            />

            <select
              name="country"
              id="country"
              required="required">
              <option defaultValue hidden>
                Select country
              </option>
              <option>Ukraine</option>
            </select>
          </div>

          <Button btnClass="btn" type="submit">Calculate</Button>

          <div className="confirm__container--form-result">
            <h3>Your taxes:</h3>

            <Input
              value={"₴" + tax}
              readOnly="readOnly"
            />
          </div>
        </form>

        {showResults ? <Details/> : null}
      </Fragment>
    </DashboardCard>
  );
};

export default DashboardTaxes;
