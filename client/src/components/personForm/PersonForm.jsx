import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

import "./personForm.css";
import { Button, FormControl } from "@mui/material";

const PersonForm = ({ row }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clearance, setClearance] = useState("");

  console.log(row);

  useEffect(() => {
    if (row) {
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
    if (row) {
      try {
        await axios.put(`/person/${row.id}`, newPerson);
        window.location.replace("/positionManagement");
      } catch (error) {}
    } else {
      try {
        await axios.post("/person", newPerson);
        window.location.replace("/positionManagement");
      } catch (error) {
        console.log(error);
      }
    }
  };

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

  const clearances = [
    "None",
    "Secret",
    "TS/SCI",
    "Full Scope Poly",
    "CI Poly",
    "Public Trust",
    "Top Secret",
  ];

  const states = [
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District of Columbia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Minor Outlying Islands",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "U.S. Virgin Islands",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  return (
    <Paper sx={style}>
      <h1>Person Form</h1>
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
        <Button variant="contained" type="submit">
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default PersonForm;
