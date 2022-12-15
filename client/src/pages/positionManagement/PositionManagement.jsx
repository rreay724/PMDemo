import { useState } from "react";
import {
  PersonsDataTable,
  BilletsDataTable,
  TableHeader,
  Dashboard,
} from "../../components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./positionManagement.css";

const PositionManagement = () => {
  const [value, setValue] = useState("one");
  const [tab, setTab] = useState("dashboard");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="positionManagement">
      <div className="table">
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab
              value="one"
              label="Dashboard"
              onClick={() => setTab("dashboard")}
            />
            <Tab
              value="two"
              label="Persons"
              onClick={() => setTab("persons")}
            />
            <Tab
              value="three"
              label="Billets"
              onClick={() => setTab("billets")}
            />
          </Tabs>
        </Box>
        <TableHeader />

        {tab === "persons" && <PersonsDataTable />}
        {tab === "billets" && <BilletsDataTable />}
        {tab === "dashboard" && <Dashboard />}
      </div>
    </div>
  );
};

export default PositionManagement;
