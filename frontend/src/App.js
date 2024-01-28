import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Layout from "./views/Layout";
import Dashboard from "./views/Dashboard";
import Urgent from "./views/Urgent";
import Task from "./views/Task";
import Homepage from "./views/Homepaje";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/layout" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="task" element={<Task />} />
            <Route path="urgent" element={<Urgent />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
