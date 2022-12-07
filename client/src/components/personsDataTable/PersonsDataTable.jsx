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
      field: "",
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

  useEffect(() => {
    const fetchPersons = async () => {
      const res = await axios.get("/person");
      setPersons(res.data);
    };
    fetchPersons();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={persons}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      <Button
        variant="outlined"
        sx={{ marginTop: "10px" }}
        onClick={() => setOpen(true)}
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
          <PersonForm row={row} />
        </Box>
      </Modal>
    </div>
  );
}
