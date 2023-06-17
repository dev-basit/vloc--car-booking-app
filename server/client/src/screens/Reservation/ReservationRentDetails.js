import React from "react";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import Field from "../../components/Field";
import colors from "../../config/colors";

function ReservationRentDetails() {
  return (
    <Screen className="reservationScreen">
      <img src="./assets/level2Completed.png" />
      <button onClick={() => console.log("go back to level 1")}>
        <img src="./assets/arrow.png" className="arrow-goback" />
      </button>

      <section className="reservation-container">
        <img src="./assets/vLocLogo.png" className="reservation-logo" />
        <AppButton
          backgroundColor={colors.darkGrey}
          color={colors.primary}
          text="1234$/mo"
          style={{
            fontWeight: "bold",
          }}
        >
          <p style={{ color: "white" }}>Total</p>
        </AppButton>

        <form className="reservation-form">
          <p className="formHeaderText">Reservation</p>

          <section style={{ display: "flex" }}>
            <section className="rentDuration">
              <h3>2023-03-23</h3>
              <p>Beginning</p>
            </section>

            <section className="rentDuration">
              <h3>3 months</h3>
              <p>Rental Period</p>
            </section>
          </section>

          <Field
            title="Estimated mileage"
            input={{
              type: "number",
              id: "number",
              placeholder: "00000000",
            }}
            className="reservationField"
          />

          <Field
            title="Pick up Location"
            input={{
              type: "text",
              id: "pickupLocation",
              placeholder: "Lorem Ipsum text",
            }}
            className="reservationField"
          />

          <Field
            title="Drop off Location"
            input={{
              type: "text",
              id: "dropoffLocation",
              placeholder: "Lorem Ipsum text",
            }}
            className="reservationField"
          />
        </form>
        <AppButton text="Continue" />
      </section>
    </Screen>
  );
}

export default ReservationRentDetails;
