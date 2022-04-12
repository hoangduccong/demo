import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SideBar from "./components/sidebar/SideBar";
import FindMedicines from "./components/FindMedicines";
import Schedule from "./components/Schedule";

export default function App() {
  return (
    <Router>
      <SideBar />
      <Switch>
        <Route path="/" exact component={FindMedicines} />
        <Route path="/schedule" exact component={Schedule} />
      </Switch>
    </Router>
  );
}
