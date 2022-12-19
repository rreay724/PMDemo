import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { Button, FormControl } from "@mui/material";
import {
  travelRequirements,
  exemptStatuses,
  clearances,
  billetStatuses,
} from "./values";
import "./billetForm.css";

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

const BilletForm = ({ row, setOpen, fetchBillets }) => {
  const [billetNumber, setBilletNumber] = useState("");
  const [billetTitle, setBilletTitle] = useState("");
  const [billetStatus, setBilletStatus] = useState("");
  const [exemptStatus, setExemptStatus] = useState("");
  const [travelRequirement, setTravelRequirement] = useState("");
  const [clearanceRequirement, setClearanceRequirement] = useState("");
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState("");

  useEffect(() => {
    if (Object.keys(row).length !== 0) {
      setBilletNumber(row.billetNumber);
      setBilletTitle(row.title);
      setBilletStatus(row.billetStatus);
      setExemptStatus(row.exemptStatus);
      setTravelRequirement(row.travelRequirement);
      setClearanceRequirement(row.clearanceRequirement);
      if (row.person) {
        setPerson(row.person);
      }
    }
  }, [row]);

  useEffect(() => {
    const getPersons = async () => {
      const res = await axios.get("/person");
      setPersons(res.data);
    };

    getPersons();
  }, []);

  const handleRemovePerson = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/billet/person/${row.id}`);
      setPerson("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newBillet = {};
    if (person) {
      newBillet = {
        billetNumber,
        title: billetTitle,
        billetStatus,
        exemptStatus,
        travelRequirement,
        clearanceRequirement,
        person,
      };
    } else {
      newBillet = {
        billetNumber,
        title: billetTitle,
        billetStatus,
        exemptStatus,
        travelRequirement,
        clearanceRequirement,
      };
    }

    if (Object.keys(row).length !== 0) {
      try {
        await axios.put(`/billet/${row.id}`, newBillet);
        setOpen(false);
        fetchBillets();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post("/billet", newBillet);
        setOpen(false);
        fetchBillets();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Paper sx={style}>
      <h1 className="header">Billet Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputBilletRow">
          <TextField
            variant="outlined"
            id="billetNumber"
            label="Billet Number"
            sx={{ width: "100%" }}
            onChange={(e) => setBilletNumber(e.target.value)}
            value={billetNumber}
            required={true}
          />

          <TextField
            variant="outlined"
            id="billetTitle"
            label="Billet Title"
            sx={{ width: "100%" }}
            onChange={(e) => setBilletTitle(e.target.value)}
            value={billetTitle}
            required={true}
          />
        </div>

        <div className="inputBilletRow">
          <FormControl fullWidth required={true}>
            <InputLabel id="demo-select-small">Billet Status</InputLabel>

            <Select
              value={billetStatus}
              label="Billet Status"
              sx={{
                width: "100%",
                color: "black !important",
                textAlign: "left",
              }}
              defaultValue=""
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
              defaultValue=""
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
        <div className="inputBilletRow">
          <FormControl fullWidth>
            <InputLabel>Clearance Requirement</InputLabel>
            <Select
              value={clearanceRequirement}
              label="Clearance Requirement"
              sx={{
                width: "100%",
                color: "black !important",
                textAlign: "left",
              }}
              defaultValue=""
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
              defaultValue=""
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
        <div className="inputRow-person">
          <FormControl fullWidth>
            <InputLabel id="demo-select-small">Attach Person</InputLabel>

            <Select
              value={person}
              defaultValue={person}
              label="Attach Person"
              sx={{
                width: "100%",
                color: "black !important",
                textAlign: "left",
              }}
              onChange={(e) => setPerson(e.target.value)}
            >
              {persons.map((person) => (
                <MenuItem
                  sx={{ bgcolor: "#fff" }}
                  value={person.id}
                  key={person.id}
                >
                  {`${person.lastName}, ${person.firstName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleRemovePerson}
            sx={{ marginLeft: "20px", height: "45px" }}
          >
            Remove
          </Button>
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
};

export default BilletForm;
