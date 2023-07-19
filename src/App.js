import Sidebar from "./components/sidebar/sidebar";
import Calendar from "./pages/calendar/calendar";
import Patients from "./pages/patients/Patients";
import NotFound from "./pages/notfound/notfound";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
