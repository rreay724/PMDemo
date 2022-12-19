import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { PersonForm } from "../../components";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

import axios from "axios";

export default function PersonsDataTable() {
  const [row, setRow] = useState({});
  const [persons, setPersons] = useState([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
      width: 220,
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
    try {
      const res = await axios.get("/person");
      setPersons(res.data);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleOpen = () => {
    setRow({});
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const setOpenFromChild = (open) => {
    setOpen(open);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      {!loaded && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="success" />
        </Stack>
      )}
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
        onClose={handleClose}
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
