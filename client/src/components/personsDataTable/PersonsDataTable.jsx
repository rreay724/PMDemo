import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "firstName", headerName: "First name", width: 190 },
  { field: "lastName", headerName: "Last name", width: 190 },
  {
    field: "email",
    headerName: "Email",
    width: 190,
  },
  {
    field: "phone",
    headerName: "Phone",
    sortable: false,
    width: 180,
  },
  { field: "securityClearance", headerName: "Security Clearance", width: 290 },
];

export default function PersonsDataTable() {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    const fetchPersons = async () => {
      const res = await axios.get("/person");
      setPersons(res.data);
    };
    fetchPersons();
  }, []);

  console.log(persons);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={persons}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
