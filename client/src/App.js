import { Navbar } from "./components";
import { Home, PositionManagement } from "./pages";
import NestedNavbar from "./pages/nestedNavbar/NestedNavbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/positionManagement" element={<PositionManagement />} />
        <Route path="/navbar" element={<NestedNavbar />} />
      </Routes>
    </Router>
  );
}

export default App;
