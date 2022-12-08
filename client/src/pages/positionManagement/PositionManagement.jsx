import { useState } from "react";
import {
  PersonsDataTable,
  BilletsDataTable,
  TableHeader,
} from "../../components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./positionManagement.css";
import { positions } from "@mui/system";

const PositionManagement = () => {
  const [value, setValue] = useState("one");
  const [tab, setTab] = useState("persons");

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
              label="Persons"
              onClick={() => setTab("persons")}
            />
            <Tab
              value="two"
              label="Billets"
              onClick={() => setTab("billets")}
            />
          </Tabs>
        </Box>
        <TableHeader />
        {tab === "persons" && <PersonsDataTable />}
        {tab === "billets" && <BilletsDataTable />}
      </div>
    </div>
  );
};

export default PositionManagement;
