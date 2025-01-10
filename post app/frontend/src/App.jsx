import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edit/:postid" element={<EditPost />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
