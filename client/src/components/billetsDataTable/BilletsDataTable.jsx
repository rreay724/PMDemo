import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { BilletForm } from "../";

export default function BilletsDataTable() {
  const [row, setRow] = useState({});
  const [billets, setBillets] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchBillets = async () => {
    const res = await axios.get("/billet");
    setBillets(res.data);
  };

  useEffect(() => {
    try {
      fetchBillets();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClick = (event, cellValues) => {
    setRow(cellValues.row);
    setOpen(true);
  };

  const handleOpen = () => {
    setRow({});
    setOpen(true);
  };

  const setOpenFromChild = (open) => {
    setOpen(open);
  };

  const columns = [
    {
      field: " ",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "5px" }}
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            View/Edit
          </Button>
        );
      },
    },
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
    {
      field: "travelRequirement",
      headerName: "Travel Requirement",
      width: 290,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={billets}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
      />
      <Button
        variant="outlined"
        sx={{ marginTop: "10px" }}
        onClick={handleOpen}
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
          <BilletForm
            fetchBillets={fetchBillets}
            row={row}
            setOpen={setOpenFromChild}
          />
        </Box>
      </Modal>
    </div>
  );
}
