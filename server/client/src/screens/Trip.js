import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";

import Screen from "../components/Screen";
import AppDatePicker from "../components/AppDatePicker";
import AppButton from "../components/AppButton";
import Field from "../components/Field";
import { ReservationContext } from "../context/ReservationContext";
import { getNoOfAvailableCars } from "../controllers/cars";

function Trip() {
  const { dispatch } = useContext(ReservationContext);
  const [noOfAvailableCars, setNoOfAvailableCars] = useState(0);
  const [date, setDate] = useState("");
  const [inputs, setInputs] = useState({
    durationInMonths: 1,
    dropOffLocation: "Paris",
    pickupLocation: "Paris",
    pricePerDay: 19.66,
    packagePrice: 590,
    startDate: "",
  });
  const history = useHistory();

  useEffect(() => {
    getNoOfAvailableCars()
      .then((no) => setNoOfAvailableCars(no))
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    if (inputs.durationInMonths == 1) setInputs({ ...inputs, pricePerDay: 19.66, packagePrice: 590 });
    else if (inputs.durationInMonths == 3)
      setInputs({ ...inputs, pricePerDay: 5.44, packagePrice: 490 });
    else if (inputs.durationInMonths == 6) setInputs({ ...inputs, pricePerDay: 2.5, packagePrice: 450 });
  }, [inputs.durationInMonths]);

  const handleDateCallback = (date) => {
    setDate(date);
  };

  function handleInputs(e) {
    let id = e.target.id;
    let value = e.target.value;

    if (id == "durationInMonths") value = parseInt(value);

    if (id == "mileage") value = parseInt(value);

    setInputs({ ...inputs, [id]: value });
  }

  const handleAddReservationInfo = (e) => {
    e.preventDefault();

    setInputs({
      ...inputs,
    });

    dispatch({
      type: "addInfo",
      payload: {
        ...inputs,
        startDate: date,
        dropOffLocation: inputs.pickupLocation ? inputs.pickupLocation : "Escalquens",
      },
    });
    history.push("/reservation/AddOns");
  };

  return (
    <Screen className="tripScreen">
      <section>
        <Link to="/sidebarMenu">
          <HiMenu className="navbarIcon" />
        </Link>
        <img src="./assets/vLocLogo.png" alt="logo" className="logo" />
      </section>

      <form className="inputContainer" onSubmit={handleAddReservationInfo}>
        <section>
          <p className="formHeaderText">Votre voyage</p>
        </section>

        <section className="inputContainerField">
          <AppDatePicker dateCallback={handleDateCallback} />
        </section>

        <section className="inputContainerField selectContainer">
          <label htmlFor="durationInMonths">Durée</label>
          <section>
            <select name="noOfMonths" id="durationInMonths" className="options" onChange={handleInputs}>
              <option value="1">1 mois</option>
              <option value="3">3 mois</option>
              <option value="6">6 mois</option>
            </select>
            <MdKeyboardArrowDown color="green" size={20} />
          </section>
        </section>

        <section className="inputContainerField">
          <label htmlFor="pickupLocation">Lieu de ramassage</label>
          <section>
            <select
              name="pickupLocation"
              id="pickupLocation"
              className="options"
              onChange={handleInputs}
            >
              <option value="Escalquens">Escalquens</option>
              <option value="Paris">Paris</option>
              <option value="Bordeaux">Bordeaux</option>
              <option value="Lyon">Lyon</option>
              <option value="Marseille">Marseille</option>
            </select>
            <MdKeyboardArrowDown color="green" size={20} />
          </section>
        </section>

        <Field
          title="Estimated mileage"
          input={{
            type: "number",
            id: "mileage",
            placeholder: "000000",
          }}
          onChangeHandler={handleInputs}
        />
      </form>

      <section className="noOfVehicles">
        <h4>Véhicules disponibles</h4>
        <p>{noOfAvailableCars} disponible</p>
      </section>

      <section className="availableCarDetails">
        <section className="availableCarDetailsRow">
          <img src="./assets/amicar.png" alt="logo" />
          <section style={{ padding: "1rem" }}>
            <h2>Citroën</h2>
            <p>AMI</p>
          </section>
        </section>

        <section className="availableCarDetailsRow">
          <section className="price">
            <h2>&euro;{inputs.pricePerDay}</h2>
            <p> / jour</p>
          </section>
        </section>
        <AppButton text="Choisissez des options" onClick={handleAddReservationInfo} />
      </section>
    </Screen>
  );
}

export default Trip;
