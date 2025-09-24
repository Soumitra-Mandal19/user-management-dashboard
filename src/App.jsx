import "./index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UsersPage from "./pages/UsersPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />}/>
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
