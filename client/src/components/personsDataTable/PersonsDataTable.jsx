import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PersonsDataTable() {
  const [persons, setPersons] = useState([]);
  const [open, setOpen] = useState(false);
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
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Person Form
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Person form goes here
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
