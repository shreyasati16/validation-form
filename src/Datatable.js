import React from "react";
import "./Datatable.css";

const DataTable = ({ valDat }) => {
    return (
        <div className="val-table">
            <h2>Validated data</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone No.</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {valDat &&
                        valDat.map((data, i) => (
                            <tr key={i}>
                                <td>{data.fname}</td>
                                <td>{data.lname}</td>
                                <td>{data.email}</td>
                                <td>{data.password}</td>
                                {/* <td>
                                    <img
                                        src="https://img.icons8.com/material-sharp/512/delete-forever.png"
                                        className="del-button"
                                        onClick={() => handleDelete(i)}
                                    />
                                </td> */}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
