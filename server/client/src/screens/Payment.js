import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import { AuthContext } from "../context/AuthContext";
import { ReservationContext } from "../context/ReservationContext";
import {
  changeCarAvailableStatus,
  getIdOfFirstAvailableCar,
  getNoOfAvailableCars,
} from "../controllers/cars";
import { addReservation, updateReservation } from "../controllers/reservations";
import { getClient, updateClient } from "../controllers/clients";

function Payment() {
  const { reservation, dispatch } = useContext(ReservationContext);
  const { currentUser } = useContext(AuthContext);
  const [currentUserData, setCurrentUserData] = useState({}); // we will fetch this from database once the page loads
  const [isUserApproved, setIsUserApproved] = useState(false); // we will fetch this from database once the page loads
  const [noOfAvailableCars, setNoOfAvailableCars] = useState(0); // we will fetch this from database once the page loads
  const [carToBookId, setCarToBookId] = useState(""); // we will fetch this from database once the page loads
  const [showPayment, setShowPayment] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  // console.log("no of available cars ", noOfAvailableCars);
  console.log("car to book id ", carToBookId);
  console.log("reservation data from context in payment screen ", reservation);
  // console.log("current user data from reducer", currentUser);
  // console.log("current user data from backend", currentUserData);

  useEffect(() => {
    getNoOfAvailableCars()
      .then((size) => {
        setNoOfAvailableCars(size);
      })
      .catch((err) => console.log(err));

    getIdOfFirstAvailableCar()
      .then((id) => {
        setCarToBookId(id);
      })
      .catch((err) => console.log(err));

    getClient(currentUser.uid).then((clientData) => {
      setCurrentUserData(clientData);

      console.log("is approved or not ", clientData.isApproved);
      if (clientData.isApproved === "No") setIsUserApproved(false);
      else if (clientData.isApproved === "Yes") setIsUserApproved(true);
    });
  }, []);

  const data = {
    customer_id: currentUser.uid,
    car_id: carToBookId,
  };

  function checkCarAvailabilityAndCustomerApproval() {
    if (noOfAvailableCars > 0) {
      if (isUserApproved) {
        setShowPayment(true);

        // add here in context only
        dispatch({
          type: "addInfo",
          payload: { ...data, id: currentUser.uid + carToBookId },
        });
      } else {
        setErrorMessage("Vos documents ne sont pas encore approuvés");
        setShowErrorModal(true);
      }
    } else {
      setErrorMessage("Aucune voiture disponible, essayez plus tard");
      setShowErrorModal(true);
    }
  }

  const handleAddReservation = (reservation) => {
    return new Promise((resolve, reject) => {
      addReservation(reservation)
        .then((id) => {
          console.log("successfully added reservation and id is ", id);
          handleUpdateReservation(data, id);
          resolve(id);
        })
        .catch((err) => {
          console.log("failed to add reservation to database from reducer");
          reject(err);
        });
    });
  };

  function handleUpdateReservation(data, id) {
    updateReservation(data, id)
      .then(() => {
        console.log(
          "reservation updated, customer id and car id added to database for reservation id ",
          id
        );

        changeCarAvailableStatus(carToBookId)
          .then(() => {
            console.log("successfully updated car-status to 'Rented'");
            updateClient(currentUser.uid, {
              reservations: currentUserData.reservations ? [...currentUserData.reservations, id] : [id],
              noOfReservations: currentUserData.noOfReservations
                ? currentUserData.noOfReservations + 1
                : 1,
            })
              .then(() =>
                console.log(
                  "successfully added this reservation to current client reservation list and incremented 1 reservation for this client"
                )
              )
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log("failed to update reservation ");
        console.log(err);
      });
  }

  function goToStripeCheckout() {
    // console.log("inside goToStripCheckout");
    // console.log("process.env.REACT_APP_BACKEND_URL ", process.env.REACT_APP_BACKEND_URL);
    // console.log("total monthly payment = ", reservation.totalMonthlyPayment);

    fetch(process.env.REACT_APP_BACKEND_URL + "/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentInfo: [
          {
            reservationId: reservation.id,
            // price: parseInt(reservation.totalMonthlyPayment),
            price: 1,
          },
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();

        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        handleAddReservation().then(() => {
          window.location = url;
          console.log("reservation id in window location url", reservation.id);
        });
      })
      .catch((e) => {
        dispatch({
          type: "addInfo",
          payload: {
            customer_id: "",
            car_id: "",
            id: "",
          },
        });
        console.error(e.error);

        // also add code to remove it from the database
      });
  }

  return (
    <Screen className="paymentScreen">
      <img src="/assets/level5Completed.png" />
      <button onClick={() => console.log("go back to level 4")}>
        <img src="/assets/arrow.png" className="arrow-goback" />
      </button>

      <section className="reservation-container">
        <form className="reservation-form">
          <AppButton
            backgroundColor={colors.darkGrey}
            color={colors.primary}
            style={{
              fontWeight: "bold",
            }}
            onClick={checkCarAvailabilityAndCustomerApproval}
          >
            <p style={{ color: "white", width: "100%" }}>Trouver une voiture</p>
          </AppButton>

          {showErrorModal && (
            <div>
              <p style={{ color: "red" }}>{errorMessage}</p>
            </div>
          )}

          {showPayment && reservation.paymentMethod === "Online payment" && (
            <>
              <AppButton
                text={
                  <>
                    {reservation.totalMonthlyPayment}
                    <>&euro;</>
                  </>
                }
                backgroundColor={colors.darkGrey}
                color={colors.primary}
                style={{
                  fontWeight: "bold",
                }}
                onClick={goToStripeCheckout}
              >
                <p style={{ color: "white" }}>Payez maintenant</p>
              </AppButton>
            </>
          )}

          {showPayment && reservation.paymentMethod !== "Online payment" && (
            <AppButton
              text={
                <>
                  {reservation.totalMonthlyPayment}
                  <>&euro;</>
                </>
              }
              backgroundColor={colors.darkGrey}
              color={colors.primary}
              style={{
                fontWeight: "bold",
              }}
              onClick={() =>
                handleAddReservation().then(() => {
                  history.push(`/reservation/contract/${reservation.id}`);
                })
              }
            >
              <p style={{ color: "white" }}>Payer</p>
            </AppButton>
          )}
        </form>
      </section>
    </Screen>
  );
}

export default Payment;
