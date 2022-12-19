import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Button } from "@mui/material";
import { style } from "./values";
import "./labCatForm.css";

export default function LabCatForm({ row, setOpen, fetchLabCats }) {
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");

  useEffect(() => {
    if (Object.keys(row).length !== 0) {
      setName(row.name);
      setShortName(row.shortName);
    }
  }, [row]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLabCat = { name, shortName };

    if (Object.keys(row).length !== 0) {
      try {
        await axios.put(`/laborCategory/${row.id}`, newLabCat);
        setOpen(false);
        fetchLabCats();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post("/laborCategory", newLabCat);
        setOpen(false);
        fetchLabCats();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Paper sx={style}>
      <h1 className="header">Labor Category Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputBilletRow">
          <TextField
            variant="outlined"
            id="labCatName"
            label="Name"
            sx={{ width: "100%" }}
            onChange={(e) => setName(e.target.value)}
            value={name}
            required={true}
          />

          <TextField
            variant="outlined"
            id="shortName"
            label="Short Name"
            sx={{ width: "100%" }}
            onChange={(e) => setShortName(e.target.value)}
            value={shortName}
            required={true}
          />
        </div>

        <Button variant="contained" type="submit" sx={{ marginRight: "5px" }}>
          Save
        </Button>
        <Button
          onClick={() => setOpen(false)}
          variant="contained"
          sx={{
            marginLeft: "5px",
            bgcolor: "red",
            "&:hover": { bgcolor: "#d1001f" },
          }}
        >
          Cancel
        </Button>
      </form>
    </Paper>
  );
}
