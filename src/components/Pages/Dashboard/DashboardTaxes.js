import React, {Fragment, useRef, useState} from "react";
import Input from "../../UI/Input";
import DashboardCard from "../../UI/DashboardCard";
import Button from "../../UI/Button";
import {CircularProgressbar} from "react-circular-progressbar";
import {Spinner} from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.css';


const DashboardTaxes = (props) => {
    const [tax, setTax] = useState(0);

    const enteredSalary = useRef();

    const submitForm = (e) => {
        e.preventDefault();
        let salary = enteredSalary.current.value;
        setTax(calculate(salary = {salary}));
    }

    const calculate = (props) => {
        if (props.salary == 0)
            return 0;
        let esf;
        let pdfo = props.salary * 0.18;
        let vz = props.salary * 0.015;
        if (props.salary < 6500)
            esf = 1430;
        else
            esf = props.salary * 0.22;
        return Math.round((esf + pdfo + vz) * 100) / 100;
    };


    return (
        <DashboardCard title="Calculate your taxes" cardClass=" ">
            <Fragment>
                <form className="dashboard__taxes--form" onSubmit={submitForm}>
                    <div className="confirm__container--form-inputSalary">
                        <Input
                            placeholder="Your salary"
                            ref={enteredSalary}
                            required="required"
                            type="number"
                        />
                    </div>
                    {/*<div className="confirm__container--form-inputRange">*/}
                    {/*    <Slider*/}
                    {/*        axis="x"*/}
                    {/*        x={state.x}*/}
                    {/*        onChange={({ x }) => setState(state => ({ ...state, x }))}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <Button btnClass="btn" type="submit">Calculate</Button>
                    <div className="confirm__container--form-result">
                        <h3>Your taxes are:</h3>
                        <Input
                            value={"$ " + tax}
                            readOnly="readOnly"
                        />
                    </div>
                </form>
                <div className="confirm__container--form-details">
                    <details>
                        <summary>Details</summary>
                        <div className="confirm__container--form-progressBar">
                            <ProgressBar style={{ height: "30px", fontSize: "15px"}}>
                                <ProgressBar variant="success"  now={50} key={1} label="ЄСВ"/>
                                <ProgressBar variant="warning" now={45} key={2} label="ПДФО"/>
                                <ProgressBar variant="danger" now={5} key={3} label="ВЗ"/>
                            </ProgressBar>
                        </div>
                        <div style={{ width: 200, height: 200 }}>
                            <CircularProgressbar value={66} />
                        </div>
                    </details>
                </div>
            </Fragment>
        </DashboardCard>
    );
};
export default DashboardTaxes;