import { useState, useEffect } from "react";
import "./App.css";
import DataTable from "./Datatable";

function App() {
    //const initialValues = { fname: "", lname: "", email: "", password: "" };
    const [validatedData, setValidatedData] = useState(() => {
        // getting local stored value
        const saved = localStorage.getItem("finalDat");
        const initialValues = JSON.parse(saved);
        return initialValues || [];
    });
    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        //setFormValues({ ...formValues, [name]: value });
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validated = validate(formValues);
        if (Object.keys(validated).length === 0) {
            e.target.reset();
            setFormValues({});
            setIsSubmit(true);
            setValidatedData([...validatedData, formValues]);
        } else {
            setFormErrors(validated);
        }
    };

    useEffect(
        () => {
            console.log(formErrors);
            if (Object.keys(formErrors).length === 0 && isSubmit) {
                console.log(formValues);
            }
        },
        [formErrors],
        localStorage.setItem("finalDat", JSON.stringify(validatedData))
    );

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.fname) {
            errors.fname = "First name is required!";
        } else if (values.fname.length < 2) {
            errors.fname = "first name should be more than 2 character";
        }
        if (!values.lname) {
            errors.lname = "last name name is required!";
        } else if (values.lname.length < 2) {
            errors.lname = "last name should be more than 2 character";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };

    return (
        <div className="container">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className="ui message success">Signed in successfully</div>
            ) : (
                <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            )}
            <form onSubmit={handleSubmit}>
                <h1>Login Form</h1>
                <div className="ui divider"></div>
                <div className="ui form">
                    <div className="field">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="fname"
                            placeholder="fname"
                            value={formValues.fname}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.fname}</p>
                    <div className="field">
                        <label>last Name</label>
                        <input
                            type="text"
                            name="lname"
                            placeholder="lname"
                            value={formValues.lname}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.lname}</p>
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.email}</p>
                    <div className="field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.password}</p>
                    <button className="fluid ui button blue">Submit</button>
                </div>
            </form>
            {validatedData.length > 0 && <DataTable valDat={validatedData} />}
        </div>
    );
}

export default App;
