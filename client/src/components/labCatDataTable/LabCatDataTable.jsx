import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { LabCatForm } from "..";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

export default function LabCatDataTable() {
  const [row, setRow] = useState({});
  const [labCats, setLabCats] = useState([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fetchLabCats = async () => {
    try {
      const res = await axios.get("/laborCategory");
      setLabCats(res.data);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLabCats();
  }, []);

  const handleClick = (event, cellValues) => {
    setRow(cellValues.row);
    setOpen(true);
  };

  const handleOpen = () => {
    setRow({});
    setOpen(true);
  };

  const setOpenFromForm = (open) => {
    setOpen(open);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
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
    { field: "name", headerName: "Labor Category Name", width: 300 },
    {
      field: "shortName",
      headerName: "Labor Category Short Name",
      width: 230,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      {!loaded && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="success" />
        </Stack>
      )}
      <DataGrid
        rows={labCats}
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
        Add Labor Category
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <LabCatForm
            fetchLabCats={fetchLabCats}
            row={row}
            setOpen={setOpenFromForm}
          />
        </Box>
      </Modal>
    </div>
  );
}
