import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { MdKeyboardArrowDown } from "react-icons/md";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";
import { ReservationContext } from "../../context/ReservationContext";

function ReservationBillSummary() {
  const { reservation, dispatch } = useContext(ReservationContext);
  const [inputs, setInputs] = useState({ paymentMethod: "Online payment", endDate: "" });
  const history = useHistory();

  // console.log("useParams id value ", id);
  // console.log("reservation info upto addons screen ", reservation);
  // console.log("addons price", addonsPrice);
  // console.log("all addons ", reservation.addons);
  // console.log("reservation data from context in bill summary screen ", reservation);

  function findReturningDate(addNoOfMonths) {
    const inputDate = reservation.startDate;
    const currentDate = moment(inputDate, "YYYY-MM-DD");
    const futureDate = currentDate.add(addNoOfMonths, "months");
    inputs.endDate = futureDate.format("YYYY-MM-DD");
    return futureDate.format("YYYY-MM-DD");
  }

  function handleInputs(e) {
    let id = e.target.id;
    let value = e.target.value;

    // console.log("id ", id);
    // console.log("value ", value);
    // console.log("id ", e.target.id, " value ", value);

    setInputs({ ...inputs, [id]: value });
    // console.log("inputs while changing", inputs);
  }

  function viewContract(e) {
    e.preventDefault();
    // console.log("inputs in bill sumary screen just before going to next screen ", inputs);
    dispatch({ type: "addInfo", payload: inputs });
    history.push("/reservation/signature");
  }

  return (
    <Screen className="reservationScreen reservationBillSummaryScreen">
      <img src="/assets/level5Completed.png" />
      <button onClick={() => console.log("go back to level 4")}>
        <img src="/assets/arrow.png" className="arrow-goback" />
      </button>

      <section className="reservation-container">
        <img src="/assets/vLocLogo.png" className="reservation-logo" />

        <form className="reservation-form">
          <p className="formHeaderText">Résumé de la facture</p>

          <section className="datesContainer">
            <section className="timePeriod">
              <p>Depuis</p>
              <p>{reservation.startDate}</p>
            </section>

            <section className="timePeriod" style={{ borderRight: "none" }}>
              <p>Pour</p>
              <p>{findReturningDate(reservation.durationInMonths)}</p>
            </section>
            <p className="timeDuration">
              {reservation.durationInMonths * 30} jours, {reservation.durationInMonths} mois
            </p>

            <section className="priceForTimePeriod">
              <h4>1 mois:</h4>
              <h2>&euro;{reservation.packagePrice}/mo</h2>
            </section>
          </section>

          <section className="addonListContainer">
            <h4>
              <strong>Modules sélectionnés</strong>
            </h4>

            {reservation.addons.map((item) => {
              return (
                <section className="addonListItem" key={item.itemName}>
                  <p>
                    {item.itemName} <br />
                    {<p>30 jours * {item.price}&euro;</p>}
                  </p>
                  <p>{(item.price * 30).toFixed(2)}&euro;</p>
                </section>
              );
            })}
          </section>

          <AppButton
            text={
              <>
                {reservation.addonsPricePerMonth} <>&euro;</>
              </>
            }
            backgroundColor={colors.darkGrey}
            color={colors.primary}
            style={{
              fontWeight: "bold",
            }}
          >
            <p style={{ color: "white" }}>Ajouts / mois</p>
          </AppButton>

          <AppButton
            text={
              <>
                {(reservation.addonsPricePerMonth * reservation.durationInMonths).toFixed(2)}
                <>&euro; </>
              </>
            }
            backgroundColor={colors.darkGrey}
            color={colors.primary}
            style={{
              fontWeight: "bold",
            }}
          >
            <p style={{ color: "white" }}> {reservation.durationInMonths} mois d'extensions</p>
          </AppButton>
        </form>

        <section className="totalContainer">
          <AppButton
            text={
              <>
                {reservation.totalMonthlyPayment}
                <>&euro; /mo</>
              </>
            }
            backgroundColor={colors.darkGrey}
            color={colors.primary}
            style={{
              fontWeight: "bold",
            }}
          >
            <p style={{ color: "white", flex: 0.8 }}>Paiement total par mois</p>
          </AppButton>
        </section>

        <section className="totalContainer">
          <AppButton
            text={
              <>
                {reservation.totalPayment}
                <>&euro; /mo</>
              </>
            }
            backgroundColor={colors.darkGrey}
            color={colors.primary}
            style={{
              fontWeight: "bold",
            }}
          >
            <p style={{ color: "white", flex: 0.8 }}>
              Paiement total pendant {reservation.durationInMonths} mois
            </p>
          </AppButton>
        </section>

        <section className="paymentContainer">
          <h4>Avertir</h4>

          <section>
            <label htmlFor="paymentMethod">Mode de paiement</label>
            <section className="paymentMethod">
              <select name="noOfMonths" id="paymentMethod" style={{ flex: 1 }} onChange={handleInputs}>
                <option value="Online Payment">Paiement en ligne</option>
                <option value="By Cheque">Par chèque</option>
                <option value="Cash">Espèces</option>
              </select>
              <MdKeyboardArrowDown color="green" size={20} />
            </section>
          </section>
        </section>

        <section className="distributionOfPaymentContainer">
          <h4>Distribution de paiement</h4>

          <form>
            <input
              type="radio"
              id="paymentDistribution"
              name="paymentDistribution"
              value="Monthly ($1234 / month)"
            />
            <label htmlFor="paymentDistribution">
              paiement mensuel: &euro;{reservation.totalMonthlyPayment}
            </label>
          </form>
        </section>

        <AppButton text="Signer le contrat" onClick={viewContract} />
      </section>
    </Screen>
  );
}

export default ReservationBillSummary;
