import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Page, Text, Image, Document, StyleSheet, View } from "@react-pdf/renderer";

import { getReservationData } from "../../controllers/reservations";
import { AuthContext } from "../../context/AuthContext";
import { ReservationContext } from "../../context/ReservationContext";

function ContractDetails({ id }) {
  const { currentUser } = useContext(AuthContext);
  const [reservation, setReservation] = useState({}); // we will fetch this from databse once page loads
  // const { reservation, dispatch } = useContext(ReservationContext);
  // const [rentedCar, setRentedCar] = useState({}); // we will fetch this from databse once page loads
  // const history = useHistory();
  // const { id } = useParams();

  // console.log("useParams id value ", id);
  // console.log("reservation info fetch from backend upto contract screen ", reservation);
  // console.log("reservation info fetch from reducer upto contract screen ", reservation);
  // console.log("user info in contract screen ", currentUser);

  useEffect(() => {
    getReservationData(id)
      .then((data) => setReservation(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text> User Id: {currentUser.uid}</Text>
          {/* <Text> Car Model: {rentedCar.model + rentedCar.brand}</Text> */}
          <Text> Rented for Months: {reservation.durationInMonths}</Text>
          <Text> Start Date: {reservation.startdate}</Text>
          <Text> End Date: {reservation.endDate}</Text>
          <Text> Total Price: {reservation.pricePerDay}</Text>
          <Text>Price Per Month: {reservation.totalMonthlyPayment}</Text>
          <a href={reservation.signatureUrl}>User Signature: </a>
        </View>
      </Page>
    </Document>
  );
}

export default ContractDetails;

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
