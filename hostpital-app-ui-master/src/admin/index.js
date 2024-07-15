
import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
import "../../src/bootstrap/css/bootstrap.min.css"
import "assets/css/animate.min.css";
import "assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "admin/layouts/Admin.js";
import AdminLogin from "./views/AdminLogin";
import { useAuth } from "Auth/AuthContext";

export default function Admin() {
  const { user } = useAuth()
  return (
    <>
      <Route exact path="/admin/login" component={AdminLogin} />
      {user.type === "admin" && <Route path="/" render={(props) => <AdminLayout {...props} />} />}
      {user.type !== "admin" && <Redirect to="/admin/login" />}
    </>
  )
}