import "./sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import PersonIcon from "@mui/icons-material/Person";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="iconContainer">
        <Button size="large">
          <HomeIcon fontSize="large" className="sidebarIcon" />
        </Button>
      </div>
      <div className="iconContainer">
        <Button size="large">
          <PersonIcon fontSize="large" className="sidebarIcon" />
        </Button>
      </div>
      <div className="arrowIconContainer">
        <Button size="large">
          <ArrowCircleRightIcon fontSize="large" className="sidebarIcon" />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
