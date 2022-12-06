import { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

import "./billetForm.css";
import { Button, FormControl } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "55rem",
  bgcolor: "#fff !important",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const BilletForm = () => {
  const [billetNumber, setBilletNumber] = useState("");
  const [billetTitle, setBilletTitle] = useState("");
  const [billetStatus, setBilletStatus] = useState("");
  const [exemptStatus, setExemptStatus] = useState("");
  const [travelRequirement, setTravelRequirement] = useState("");
  const [clearanceRequirement, setClearanceRequirement] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBillet = {
      billetNumber,
      title: billetTitle,
      billetStatus,
      exemptStatus,
      travelRequirement,
      clearanceRequirement,
    };

    console.log(newBillet);

    try {
      await axios.post("/billet", newBillet);
      window.location.replace("/positionManagement");
    } catch (error) {
      console.log(error);
    }
  };

  const travelRequirements = [
    "0%",
    "10%",
    "20%",
    "30%",
    "40%",
    "50%",
    "60%",
    "70%",
    "80%",
    "90%",
    "100%",
  ];

  const clearances = [
    "Secret",
    "TS/SCI",
    "FSP",
    "CI",
    "Public Trust",
    "Top Secret",
  ];

  const billetStatuses = ["Vacant", "Filled", " On hold", "Cancelled"];

  const exemptStatuses = ["Exempt", "Non-Exempt"];
  return (
    <Paper sx={style}>
      <h1>Person Form</h1>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <div className="inputRow">
            <TextField
              variant="outlined"
              id="billetNumber"
              label="Billet Number"
              sx={{ marginRight: "10px", width: "100%" }}
              onChange={(e) => setBilletNumber(e.target.value)}
            />

            <TextField
              variant="outlined"
              id="billetTitle"
              label="BilletTitle"
              sx={{ marginLeft: "10px", width: "100%" }}
              onChange={(e) => setBilletTitle(e.target.value)}
            />
          </div>
        </FormControl>

        <div className="inputRow">
          <FormControl fullWidth>
            <InputLabel id="demo-select-small">Billet Status</InputLabel>

            <Select
              value={billetStatus}
              label="Billet Status"
              sx={{
                width: "100%",
                color: "black !important",
                textAlign: "left",
              }}
              onChange={(e) => setBilletStatus(e.target.value)}
            >
              {billetStatuses.map((status) => (
                <MenuItem sx={{ bgcolor: "#fff" }} value={status} key={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-select-small">Exempt Status</InputLabel>

            <Select
              value={exemptStatus}
              label="Exempt Status"
              sx={{
                width: "100%",
                color: "black !important",
                textAlign: "left",
              }}
              onChange={(e) => setExemptStatus(e.target.value)}
            >
              {exemptStatuses.map((status) => (
                <MenuItem sx={{ bgcolor: "#fff" }} value={status} key={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="inputRow">
          <FormControl fullWidth>
            <InputLabel id="demo-select-small">
              Clearance Requirement
            </InputLabel>

            <Select
              value={clearanceRequirement}
              label="Clearance Requirement"
              sx={{
                width: "100%",
                color: "black !important",
                textAlign: "left",
              }}
              onChange={(e) => setClearanceRequirement(e.target.value)}
            >
              {clearances.map((clearance) => (
                <MenuItem
                  sx={{ bgcolor: "#fff" }}
                  value={clearance}
                  key={clearance}
                >
                  {clearance}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-select-small">Travel Requirement</InputLabel>

            <Select
              value={travelRequirement}
              label="Clearance Requirement"
              sx={{
                width: "100%",
                color: "black !important",
                textAlign: "left",
              }}
              onChange={(e) => setTravelRequirement(e.target.value)}
            >
              {travelRequirements.map((travel) => (
                <MenuItem sx={{ bgcolor: "#fff" }} value={travel} key={travel}>
                  {travel}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default BilletForm;
