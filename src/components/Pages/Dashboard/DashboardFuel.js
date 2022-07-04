import React, {Fragment, useRef, useState} from "react";
import Input from "../../UI/Input";
import DashboardCard from "../../UI/DashboardCard";
import Button from "../../UI/Button";
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.css';

const DashboardFuel = (props) => {
    const [tax, setTax] = useState(0);
    const [list_price, setList_price] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const enteredPriceRef = useRef();
    const enteredTypeRef = useRef();
    let AKZ = 0.132;

    const submitForm = (event) => {
        event.preventDefault();

        const enteredPrice = enteredPriceRef.current?.value;
        const enteredType = enteredTypeRef.current?.value;
        if(enteredType === "DIESEL")
            AKZ = 0.078;
        else if(enteredType === "GAS")
            AKZ = 0.041;
        const taxCalculated = calculateTax(Number(enteredPrice));

        setTax(taxCalculated);
    }

    const calculateTax = (value) => {
        if (!value)
            return 0;

        let n = value * 0.083;
        const pdv = value * 0.17;
        const akz = value * AKZ;

        const tax = Math.round(( n + pdv + akz ) * 100) / 100 ;

        setList_price(Math.round((value - tax) * 100) / 100);

        setShowResults(true);
        return tax;
    };

    const Details = () => (

        <div className="confirm__container--form-results">
            <div className="confirm__container--form-result">
                <h3 style={{marginTop: "-8px"}}>RESULTS:</h3>
            </div>
                <div className="confirm__container--form-progressBar">
                    <ProgressBar style={{height: "38px", fontSize: "1.85rem", fontFamily: "SansSerif", fontWeight: "bold"}}>
                        <ProgressBar striped variant="success" now={(list_price* 100)/(tax + list_price)} key={1} label={`List price: ${list_price}₴`}/>
                        <ProgressBar striped variant="danger" now={(tax* 100)/(tax + list_price)} key={1} label={`Taxes: ${tax}₴`}/>
                    </ProgressBar>
                </div>
        </div>
    )


    return (
        <DashboardCard title="Calculate your fuel taxes" >
            <Fragment>
                <form
                    className="dashboard__taxes--form"
                    onSubmit={submitForm}
                >
                    <div className="confirm__container--form-inputSalary">
                        <Input
                            placeholder="How much does a full tank cost you?"
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
                            required >
                            <option defaultValue>
                                A95
                            </option>
                            <option>A92</option>
                            <option>DIESEL</option>
                            <option>GAS</option>
                        </select>
                    </div>

                    <Button btnClass="btn" type="submit">Calculate</Button>
                </form>
                {showResults ? <Details/> : null}
            </Fragment>
        </DashboardCard>
    );
};

export default DashboardFuel;
