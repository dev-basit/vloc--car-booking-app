import React from "react";
import { GoCalendar } from "react-icons/go";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import Field from "../../components/Field";
import colors from "../../config/colors";

function ReservationPersonalDetails() {
  return (
    <Screen className="reservationScreen">
      <img src="./assets/level1Completed.png" />
      <button onClick={() => console.log("go back to search")}>
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
          <section className="reservation-grid2">
            <Field
              title="First Name"
              input={{
                type: "text",
                id: "firstame",
                placeholder: "Name",
              }}
              className="reservationField reservationField-grid2"
            />
            <Field
              title="Last Name"
              input={{
                type: "text",
                id: "lastame",
                placeholder: "Name",
              }}
              className="reservationField reservationField-grid2"
            />
          </section>

          <Field
            title="E-mail"
            input={{
              type: "email",
              id: "email",
              placeholder: "Loremispsum@email.com",
            }}
            className="reservationField"
          />

          <Field
            title="Start Date"
            input={{
              type: "date",
              id: "startdate",
              min: "1900-01-01",
              max: "2030-01-01",
            }}
            Icon={<GoCalendar color={colors.primary} size={20} />}
            iconPosition="right"
            className="reservationField"
          />

          <Field
            title="Address"
            input={{
              type: "text",
              id: "address",
              placeholder: "address here",
            }}
            className="reservationField"
          />

          <Field
            title="Address 2"
            input={{
              type: "text",
              id: "address2",
              placeholder: "address here",
            }}
            className="reservationField"
          />

          <Field
            title="Country"
            input={{
              type: "text",
              id: "country",
              placeholder: "Country name",
            }}
            className="reservationField"
          />
          <section className="reservation-grid2">
            <Field
              title="City"
              input={{
                type: "text",
                id: "city",
                placeholder: "city",
              }}
              className="reservationField reservationField-grid2"
            />
            <Field
              title="Zip code / Postal code"
              input={{
                type: "text",
                id: "postal code",
                placeholder: "0000",
              }}
              className="reservationField reservationField-grid2"
            />
          </section>
        </form>
        <AppButton text="Continue" />
      </section>
    </Screen>
  );
}

export default ReservationPersonalDetails;
