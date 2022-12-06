import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { BilletForm } from "../";

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
    width: 200,
  },
  { field: "exemptStatus", headerName: "Exempt Status", width: 200 },
  { field: "travelRequirement", headerName: "Travel Requirement", width: 290 },
];

export default function BilletsDataTable() {
  const [billets, setBillets] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchBillets = async () => {
      const res = await axios.get("/billet");
      setBillets(res.data);
    };
    fetchBillets();
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
      <Button
        variant="outlined"
        sx={{ marginTop: "10px" }}
        onClick={() => setOpen(true)}
      >
        Add Billet
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <BilletForm />
        </Box>
      </Modal>
    </div>
  );
}
