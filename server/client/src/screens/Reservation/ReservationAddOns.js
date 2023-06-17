import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";
import { ReservationContext } from "../../context/ReservationContext";
import { getAllAddons } from "../../controllers/addons";

function ReservationAddOns() {
  const [addons, setAddons] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState(new Set());
  const [addonsPricePerMonth, setAddonsPrice] = useState(0);
  const { reservation, dispatch } = useContext(ReservationContext);
  const history = useHistory();

  useEffect(() => {
    getAllAddons()
      .then((addons) => {
        console.log("addons successfully fetched from server ", addons);
        setAddons(addons);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    updateAddonPrice(selectedAddons);
  }, [selectedAddons]);

  function toggleAddonClicked(addon) {
    if (checkObjectExistInSet(addon))
      setSelectedAddons((prev) => new Set([...prev].filter((obj) => obj !== addon)));
    else setSelectedAddons((prev) => new Set([...prev, addon]));
  }

  function convertSetToArray(set) {
    return Array.from(set);
  }

  function checkObjectExistInSet(addon) {
    return convertSetToArray(selectedAddons).find((obj) => obj.itemName === addon.itemName);
  }

  function updateAddonPrice(addons) {
    setAddonsPrice(
      (
        convertSetToArray(addons).reduce((accumulator, current) => accumulator + current.price, 0) * 30
      ).toFixed(2)
    );
  }

  function handleSubmitAddons(e) {
    e.preventDefault();

    dispatch({
      type: "addInfo",
      payload: {
        addons: convertSetToArray(selectedAddons),
        addonsPricePerMonth: parseFloat(addonsPricePerMonth),
        totalMonthlyPayment: (parseFloat(addonsPricePerMonth) + reservation.packagePrice).toFixed(2),
        totalPayment: (
          (parseFloat(addonsPricePerMonth) + reservation.packagePrice) *
          reservation.durationInMonths
        ).toFixed(2),
      },
    });
    history.push(`/reservation/billSummary`);
  }

  return (
    <Screen className="reservationScreen">
      <img src="/assets/level3Completed.png" />
      <button onClick={() => console.log("go back to level 2")}>
        <img src="/assets/arrow.png" className="arrow-goback" />
      </button>

      <section className="reservation-container">
        <img src="/assets/vLocLogo.png" className="reservation-logo" />
        <section
          style={{
            width: "80%",
            margin: "0 auto",
          }}
        >
          <AppButton
            backgroundColor={colors.darkGrey}
            color={colors.primary}
            text={
              <>
                {addonsPricePerMonth} <>&euro; /mo</>
              </>
            }
            style={{
              fontWeight: "bold",
            }}
          >
            <p style={{ color: "white" }}>Total des addons :</p>
          </AppButton>
        </section>

        <form className="reservation-form" onSubmit={handleSubmitAddons}>
          <p className="formHeaderText">Réservation</p>
          <p className="formHeaderSubText">Vous pouvez choisir des options</p>

          <section className="addons">
            {addons.map((addon, index) => {
              return (
                <button
                  className={`addonItem ${checkObjectExistInSet(addon) ? "addonItemSelected" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleAddonClicked(addon);
                  }}
                  key={index}
                >
                  <p>{addon.name}</p>
                  <p>{addon.price}&euro;/jour</p>
                  <img src="/assets/addonQuestion.png" />
                </button>
              );
            })}
          </section>

          <AppButton text="voir récapitulatif" type="submit" />
        </form>
      </section>
    </Screen>
  );
}

export default ReservationAddOns;
