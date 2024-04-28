import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "id",
    headerName: "Sr No",
    width: 70
  },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    width: 160,
  },
  {
    field: "ref_member",
    headerName: "Ref Member",
    type: "number",
    width: 90
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
  { id: 1, fullName: "Snow Jon", ref_member: 35, status: "active" },
  { id: 2, fullName: "Lannister Cersei", ref_member: 42, status: "active" },
  { id: 3, fullName: "Lannister Jaime", ref_member: 45, status: "inactive" },
  { id: 4, fullName: "Stark Arya", ref_member: 16, status: "inactive" },
  { id: 5, fullName: "Targaryen Daenerys", ref_member: 27, status: "active" },
  { id: 6, fullName: "Melisandre", ref_member: 150, status: "inactive" },
  { id: 7, fullName: "Clifford", ref_member: 44, status: "active" }
];

export default function MembersList() {
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
