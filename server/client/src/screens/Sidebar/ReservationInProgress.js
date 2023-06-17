import React from "react";
import { HiMenu } from "react-icons/hi";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";

function ReservationInProgress() {
  return (
    <Screen className="reservationInProgressScreen">
      <section>
        <HiMenu className="navbarIcon" />
        <img src="./assets/vLocLogo.png" alt="logo" className="logo" />
      </section>

      <section className="greetings">
        <p>Good Morning</p>
        <h2>Aimal Naseem</h2>
      </section>

      <section className="inputContainer progressSection">
        <p className="formHeaderText">Reservation in progress</p>
        <img src="./assets/amicar.png" />
        <p>CITROEN - AMI</p>
        <section className="datesContainer">
          <section className="timePeriod">
            <p>START</p>
            <p>03/24/2023</p>
          </section>

          <section className="timePeriod" style={{ borderRight: "none" }}>
            <p>AS OF</p>
            <p>03/24/2023</p>
          </section>
        </section>
      </section>

      <section className="reservationButtons">
        <AppButton text="My Payments" />
        <AppButton text="My Contracts" backgroundColor={colors.darkGrey} />
        <AppButton text="My Reservations" />
      </section>
    </Screen>
  );
}

export default ReservationInProgress;
