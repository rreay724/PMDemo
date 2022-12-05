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
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Persons" onClick={() => setTab("persons")} />
        <Tab value="two" label="Billets" />
      </Tabs>
    </Box>
  );
};

export default TableNavbar;
