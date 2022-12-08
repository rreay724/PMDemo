import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const TableNavbar = ({ passTab }) => {
  const [value, setValue] = useState("one");
  const [tab, setTab] = useState("");
  passTab = tab;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="table navbar tabs"
      >
        <Tab
          value="persons"
          label="Persons"
          onClick={() => setTab("persons")}
        />
        <Tab value="billets" label="Billets" />
      </Tabs>
    </Box>
  );
};

export default TableNavbar;
