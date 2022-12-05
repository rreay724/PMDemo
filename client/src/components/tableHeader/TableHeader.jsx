import React from "react";
import "./tableHeader.css";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

const TableHeader = () => {
  return (
    <div className="tableHeader">
      <div className="search">
        <input />
        <SearchIcon />
      </div>
      <Button variant="contained">Advanced Search</Button>
    </div>
  );
};

export default TableHeader;
