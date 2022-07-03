import React, {Fragment, useRef, useState} from "react";
import Input from "../../UI/Input";
import DashboardCard from "../../UI/DashboardCard";
import Button from "../../UI/Button";
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.css';

const DashboardTaxes = () => {
    const [tax, setTax] = useState(0);
    const [showResults, setShowResults] = React.useState(false);
    const [esf, setESF] = useState(0);
    const [pdfo, setPDFO] = useState(0);
    const [vz, setVZ] = useState(0);
    const enteredSalaryRef = useRef();

    const submitForm = (e) => {
        e.preventDefault();
        const enteredSalary = Number(enteredSalaryRef.current?.value);
        setTax(calculate(enteredSalary));
    }

    const calculate = (salary) => {
        if (!salary) {
            return 0;
        }

        let esf;
        let pdfo = salary * 0.18;
        let vz = salary * 0.015;
        if (salary < 6500)
            esf = 1430;
        else
            esf = salary * 0.22;

        let tax = Math.round((esf + pdfo + vz) * 100) / 100;
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
                        (соціальні гарантії на випадок безробіття, нещасних випадків, пенсійне забезпечення тощо).</p>
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
                        походження в Україні.</p>
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
                        України.</p>
                </li>
            </details>
        </div>
    )


    return (
        <DashboardCard title="Calculate your taxes" cardClass=" ">
            <Fragment>
                <form className="dashboard__taxes--form" onSubmit={submitForm}>
                    <div className="confirm__container--form-inputSalary">
                        <Input
                            placeholder="Your salary"
                            type="number"
                            ref={enteredSalaryRef}
                            required="required"
                            type="number"
                            max="1000000"
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
                            value={"₴ " + tax}
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
