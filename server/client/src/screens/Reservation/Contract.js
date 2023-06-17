import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import ContractDetails from "./ContractDetails";
import { ReservationContext } from "../../context/ReservationContext";

function Contract() {
  const { dispatch } = useContext(ReservationContext);
  const history = useHistory();
  const { id } = useParams();

  return (
    <Screen className="reservationScreen">
      <img src="/assets/level6Completed.png" />
      <button onClick={() => console.log("go back to level 5")}>
        <img src="/assets/arrow.png" className="arrow-goback" />
      </button>

      <section className="reservation-container" style={{ height: "80vh" }}>
        <img src="/assets/vLocLogo.png" className="reservation-logo" />
        {/* <PDFViewer>
          <ContractDetails />
        </PDFViewer> */}

        <PDFDownloadLink document={<ContractDetails id={id} />} filename="FORM">
          {({ loading }) =>
            loading ? (
              <AppButton text="Loading Document..." />
            ) : (
              <AppButton text="Télécharger le contrat" />
            )
          }
        </PDFDownloadLink>

        <section style={{ width: "25rem", margin: "2rem" }}>
          <AppButton
            text="Faire une autre réservation"
            onClick={() => {
              dispatch({ type: "clear" });
              history.push("/trip");
            }}
          />
        </section>
      </section>
    </Screen>
  );
}

export default Contract;
