import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';   // 
import Sidebar from './components/Sidebar';
import { useNavigate } from 'react-router-dom';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />

        {/* Dashboard Route - Protected */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
