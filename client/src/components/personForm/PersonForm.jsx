import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { states, style, clearances } from "./values";

import "./personForm.css";
import { Button, FormControl } from "@mui/material";

const PersonForm = ({ row, setOpen, fetchPersons }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clearance, setClearance] = useState("");
  const [billets, setBillets] = useState([]);
  let attachedBillets = [];

  // fetch billets where person id equals row.id which is person id
  const fetchBillets = async () => {
    try {
      // this equals /billets?person=row.id
      const res = await axios.get("/billet", { params: { person: row.id } });
      setBillets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPerson = {
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode: zip,
      phone,
      email,
      securityClearance: clearance,
    };
    if (Object.keys(row).length !== 0) {
      try {
        await axios.put(`/person/${row.id}`, newPerson);
        setOpen(false);
        fetchPersons();
      } catch (error) {}
    } else {
      try {
        await axios.post("/person", newPerson);
        setOpen(false);
        fetchPersons();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // populate fields if clicked view/edit
  useEffect(() => {
    if (Object.keys(row).length !== 0) {
      setFirstName(row.firstName);
      setLastName(row.lastName);
      setAddress(row.address);
      setCity(row.city);
      setState(row.state);
      setZip(row.zipCode);
      setEmail(row.email);
      setPhone(row.phone);
      setClearance(row.securityClearance);
    }
  }, [row]);

  useState(() => {
    fetchBillets();
  }, []);

  return (
    <Paper sx={style}>
      <h1 className="header">Person Form</h1>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <div className="inputRow">
            <TextField
              variant="outlined"
              id="firstName"
              label="First Name"
              sx={{ marginRight: "10px", width: "100%" }}
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />

            <TextField
              variant="outlined"
              id="lastName"
              label="Last Name"
              sx={{ marginLeft: "10px", width: "100%" }}
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
        </FormControl>
        <FormControl fullWidth>
          <div className="inputRow">
            <TextField
              variant="outlined"
              id="address"
              label="Address"
              sx={{ width: "100%" }}
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
        </FormControl>
        <div className="inputRow">
          <TextField
            variant="outlined"
            id="city"
            label="City"
            sx={{ width: "100%", marginRight: "10px" }}
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-select-small">State</InputLabel>

            <Select
              value={state}
              label="State"
              sx={{
                width: "100%",
                marginRight: "10px",
                color: "black !important",
                textAlign: "left",
              }}
              onChange={(e) => setState(e.target.value)}
            >
              {states.map((state) => (
                <MenuItem sx={{ bgcolor: "#fff" }} value={state} key={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            id="zipCode"
            label="Zip Code"
            sx={{ width: "100%", marginLeft: "10px" }}
            onChange={(e) => setZip(e.target.value)}
            value={zip}
          />
        </div>
        <div className="inputRow">
          <TextField
            variant="outlined"
            id="phone"
            label="Phone"
            sx={{ width: "100%", marginRight: "10px" }}
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <TextField
            variant="outlined"
            id="email"
            label="Email"
            sx={{ width: "100%", marginRight: "10px" }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-select-small">Security Clearance</InputLabel>

            <Select
              value={clearance}
              label="Security Clearance"
              sx={{
                width: "100%",
                color: "black !important",
                textAlign: "left",
              }}
              onChange={(e) => setClearance(e.target.value)}
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
        </div>
        {attachedBillets.length !== 0 && (
          <h1 className="header">Attached Billets</h1>
        )}
        <div className="inputRow-billets">
          {billets.map((billet) => (
            <TextField
              key={billet.id}
              variant="outlined"
              id="billet"
              sx={{ width: "100%", marginRight: "10px", marginBottom: "10px" }}
              value={`${billet.title} - ${billet.billetNumber}`}
              InputProps={{
                readOnly: true,
              }}
            />
          ))}
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

export default PersonForm;
