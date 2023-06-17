import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./screens/Login";
import Signup from "./screens/Signup";
import SidebarMenu from "./screens/Sidebar/SidebarMenu";
import Settings from "./screens/Sidebar/Settings";
import KYC from "./screens/Reservation/KYC";
import Trip from "./screens/Trip";
import ReservationAddOns from "./screens/Reservation/ReservationAddOns";
import ReservationBillSummary from "./screens/Reservation/ReservationBillSummary";
import Signature from "./screens/Reservation/Signature";
import Contract from "./screens/Reservation/Contract";
import Payment from "./screens/Payment";
import Admin from "./admin/Admin";
import Error from "./screens/Error";
// import Reservation from "./screens/Reservation";
// import ReservationKYC from "./screens/Reservation/ReservationKYC";
// import ReservationPersonalDetails from "./screens/Reservation/ReservationPersonalDetails";
// import ReservationRentDetails from "./screens/Reservation/ReservationRentDetails";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/sidebarMenu">
          <SidebarMenu />
        </Route>
        <Route exact path="/settings">
          <Settings />
        </Route>
        <Route exact path="/kyc">
          <KYC />
        </Route>
        <Route exact path="/trip">
          <Trip />
        </Route>
        <Route exact path="/reservation/AddOns">
          <ReservationAddOns />
        </Route>
        <Route exact path="/reservation/AddOns/:id">
          <ReservationAddOns />
        </Route>
        <Route exact path="/reservation/billSummary">
          <ReservationBillSummary />
        </Route>
        <Route exact path="/reservation/signature">
          <Signature />
        </Route>
        <Route exact path="/reservation/payment">
          <Payment />
        </Route>
        <Route exact path="/reservation/contract">
          <Contract />
        </Route>
        <Route exact path="/reservation/contract/:id">
          <Contract />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
