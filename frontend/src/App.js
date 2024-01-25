import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import Homepage from "./views/Homepaje";
import Registerpage from "./views/Registerpaje";
import Loginpage from "./views/Loginpage";
import Dashboard from "./views/Dashboard";
import reactRouterDom from "react-router-dom";
import Sidebar from "./views/Sidebar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Sidebar></Sidebar>
        <Switch>
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <Route component={Loginpage} path="/login" />
          <Route component={Registerpage} path="/register" />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
