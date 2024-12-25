import AddUser from "./AddUser";
import AllUsers from "./AllUsers";
import EditUser from "./EditUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AllUsers />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/edit/:userid" element={<EditUser />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
