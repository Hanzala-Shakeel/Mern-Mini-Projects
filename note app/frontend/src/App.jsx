import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import FilePage from "./FilePage";
import Edit from "./Edit";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filepage/:filename" element={<FilePage />} />
          <Route path="/edit/:editfilename" element={<Edit/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
