import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "billetNumber", headerName: "Billet Number", width: 190 },
  { field: "title", headerName: "Title", width: 190 },
  {
    field: "billetStatus",
    headerName: "Billet Status",
    width: 190,
  },
  {
    field: "clearanceRequirement",
    headerName: "Clearance Requirement",
    sortable: false,
    width: 180,
  },
  { field: "exemptStatus", headerName: "Exempt Status", width: 290 },
  { field: "travelRequirement", headerName: "Travel Requirement", width: 290 },
];

export default function BilletsDataTable() {
  const [billets, setBillets] = useState([]);
  useEffect(() => {
    const fetchPersons = async () => {
      const res = await axios.get("/billet");
      setBillets(res.data);
    };
    fetchPersons();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={billets}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
