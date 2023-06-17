import React from "react";
import { HiMenu } from "react-icons/hi";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";

function PastReservation() {
  return (
    <Screen className="pastReservation">
      <section>
        <HiMenu className="navbarIcon" />
        <img src="./assets/vLocLogo.png" alt="logo" className="logo" />
      </section>

      <p className="formHeaderText">Past Reservations</p>

      <section className="inputContainer progressSection">
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

        <AppButton text="View Booking" backgroundColor={colors.darkGrey} />
      </section>
    </Screen>
  );
}

export default PastReservation;
