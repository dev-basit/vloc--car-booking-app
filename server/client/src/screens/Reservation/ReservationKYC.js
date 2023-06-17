import React from "react";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";

const data = [
  { title: "Proof of identity" },
  { title: "Proof of address" },
  { title: "Permit/BSR", subTitle: " (if born after 1988)" },
];

function ReservationKYC() {
  return (
    <Screen className="reservationScreen">
      <img src="./assets/level4Completed.png" />
      <button onClick={() => console.log("go back to level 3")}>
        <img src="./assets/arrow.png" className="arrow-goback" />
      </button>

      <section className="reservation-container">
        <img src="./assets/vLocLogo.png" className="reservation-logo" />
        <AppButton
          text="1621$/mo"
          backgroundColor={colors.darkGrey}
          color={colors.primary}
          style={{
            fontWeight: "bold",
          }}
        >
          <p style={{ color: "white" }}>Total</p>
        </AppButton>

        <form className="reservation-form">
          <p className="formHeaderText">Reservation</p>

          {data.map((item) => {
            return (
              <section className="KycField">
                <p>
                  {item.title} <br />
                  {item.subTitle && (
                    <p style={{ margin: "-.2rem", fontSize: "0.7rem" }}>{item.subTitle}</p>
                  )}
                </p>
                <AppButton text="upload" style={{ width: "40%" }} />
              </section>
            );
          })}
        </form>

        <AppButton text="Continue" />
      </section>
    </Screen>
  );
}

export default ReservationKYC;
