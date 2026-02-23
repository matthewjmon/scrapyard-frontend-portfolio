import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import * as bootstrap from "bootstrap";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ViewRecord from "./pages/ViewRecord";
import NewRecord from "./pages/NewRecord";
import EditRecord from "./pages/EditRecord";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {
    if (!bootstrap.Tooltip) return;
    document
      .querySelectorAll('[data-bs-toggle="tooltip"]')
      .forEach((el) => new bootstrap.Tooltip(el));
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/records/:id"
            element={
              <>
                <Navbar />
                <ViewRecord />
              </>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <>
                <Navbar />
                <EditRecord />
              </>
            }
          />
          <Route
            path="/new"
            element={
              <>
                <Navbar />
                <NewRecord />
              </>
            }
          />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
