import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    {
        field: "date",
        headerName: "Date",
        width: 130
    },
    {
        field: "fullName",
        headerName: "Full name",
        sortable: false,
        width: 160,
    },
    {
        field: "dec",
        headerName: "Description",
        sortable: false,
        width: 160,
    },
    {
        field: "status",
        headerName: "Status",
        sortable: false,
        width: 160,
    }
];


// TO make it Dynamic , fetch the data from json server and put it into an array
// and assign that array to row
const rows = [
    { id: 1, date: "10/02/2020", dec: "dsfsfs", fullName: "Snow Jon", age: 35, status: "active" },
    { id: 2, date: "10/02/2020", dec: "dsfsffgfs", fullName: "Lannister Cersei", age: 42, status: "active" },
    { id: 3, date: "10/02/2020", dec: "dsfsdfdfs", fullName: "Lannister Jaime", age: 45, status: "inactive" },
    { id: 4, date: "10/02/2020", dec: "dsfddsfs", fullName: "Stark Arya", age: 16, status: "inactive" },
    { id: 5, date: "10/02/2020", dec: "dsfddsfs", fullName: "Targaryen Daenerys", age: 27, status: "active" },
    { id: 6, date: "10/02/2020", dec: "dsfdgsfs", fullName: "Melisandre", age: 150, status: "inactive" },
    { id: 7, date: "10/02/2020", dec: "g", fullName: "Clifford", age: 44, status: "active" }
];

export default function PaymentList() {
    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}
