import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { PersonForm } from "../../components";

import axios from "axios";

export default function PersonsDataTable() {
  const [row, setRow] = useState({});
  const [persons, setPersons] = useState([]);
  const [open, setOpen] = useState(false);

  const columns = [
    {
      field: " ",
      width: 200,
      sx: "bgcolor:white",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "5px", marginRight: "5px" }}
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            View/Edit
          </Button>
        );
      },
    },
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
    {
      field: "securityClearance",
      headerName: "Security Clearance",
      width: 290,
    },
  ];

  const handleClick = (event, cellValues) => {
    setRow(cellValues.row);
    setOpen(true);
  };

  const fetchPersons = async () => {
    const res = await axios.get("/person");
    setPersons(res.data);
  };

  useEffect(() => {
    try {
      fetchPersons();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleOpen = () => {
    setRow({});
    setOpen(true);
  };

  const setOpenFromChild = (open) => {
    setOpen(open);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={persons}
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
        Add Person
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <PersonForm
            row={row}
            fetchPersons={fetchPersons}
            setOpen={setOpenFromChild}
          />
        </Box>
      </Modal>
    </div>
  );
}
