import { Navbar, SidebarDrawer } from "./components";
import { Home, PositionManagement } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/positionManagement" element={<PositionManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
