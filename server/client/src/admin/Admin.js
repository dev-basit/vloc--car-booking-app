import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Home from "./screens/Home";
import Reservations from "./screens/Reservations";
import Clients from "./screens/clients/Clients";
import ViewClient from "./screens/clients/ViewClients";
import UpdateClient from "./screens/clients/UpdateClient";
import Cars from "./screens/cars/Cars";
import ViewCar from "./screens/cars/ViewCar";
import AddCar from "./screens/cars/AddCar";
import Error from "../screens/Error";
import Payments from "./screens/Payments";
import Configurations from "./screens/Configurations";
import AddAddon from "./components/Addons/AddAddon";
import UpdateAddon from "./components/Addons/UpdateAddon";
import Addons from "./components/Addons/Addons";
import "./admin.css";

function Admin() {
  return (
    <div>
      <Topbar />
      <div style={{ display: "flex" }}>
        <Router>
          <Sidebar />
          <Switch>
            <Route exact path="/admin" component={Home}></Route>
            <Route path="/admin/reservations" component={Reservations}></Route>

            <Route path="/admin/clients" component={Clients}></Route>
            <Route path="/admin/viewclient/:id" component={ViewClient}></Route>
            <Route path="/admin/updateclient/:id" component={UpdateClient}></Route>

            <Route exact path="/admin/cars" component={Cars}></Route>
            <Route exact path="/admin/viewcar/:id" component={ViewCar}></Route>
            <Route exact path="/admin/addcar" component={AddCar}></Route>
            <Route exact path="/admin/addcar/:id" component={AddCar}></Route>

            <Route path="/admin/payments" component={Payments}></Route>
            <Route path="/admin/configurations" component={Configurations}></Route>

            <Route path="/admin/addAddon" component={AddAddon}></Route>
            <Route path="/admin/updateAddon/:id" component={UpdateAddon}></Route>
            <Route path="*" component={Error}></Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default Admin;
