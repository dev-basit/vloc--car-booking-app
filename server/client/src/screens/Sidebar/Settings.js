import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import AppDatePicker from "../../components/AppDatePicker";
import Field from "../../components/Field";
import { addClient } from "../../controllers/clients";
import { AuthContext } from "../../context/AuthContext";
import { userInputs } from "../../config/inputs";
import { uploadPicToFirebaseStorage } from "../../controllers/docs";

function Settings() {
  const [inputs, setInputs] = useState({
    isApproved: "No",
    role: "Customer",
    email: "",
  });
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    inputs.email = currentUser.email;
  }, []);

  const handleAddProfilePic = (e) => {
    let id = e.target.id;

    uploadPicToFirebaseStorage(e, currentUser.uid)
      .then((downloadURL) => {
        setInputs((prev) => ({ ...prev, [id]: downloadURL }));
      })
      .catch((err) => console.log(err));
  };

  function handleInputs(e) {
    let id = e.target.id;
    let value = e.target.value;

    if (e.target.type === "number") value = parseInt(value);

    setInputs({ ...inputs, [id]: value });
  }

  const handleDateCallback = (date) => {
    setInputs({ ...inputs, dateOfBirth: date });
  };

  const handleAddUserInfo = (e) => {
    e.preventDefault();

    addClient(currentUser.uid, inputs)
      .then(() => {
        history.push("/kyc");
      })
      .catch((err) => {
        console.log("failed to add user ", err);
      });
  };

  return (
    <Screen className="settingsScreen">
      <section>
        <img src="./assets/vLocLogo.png" alt="logo" className="logo" />
      </section>
      <p className="formHeaderText">Réservation</p>

      <form className="inputContainer progressSection" onSubmit={handleAddUserInfo}>
        <Field
          title="Photo de profil"
          input={{ type: "file", id: "profilePic" }}
          onChangeHandler={handleAddProfilePic}
          className="reservationField"
        />

        {userInputs.map((item) => {
          return (
            <Field
              key={item.id}
              title={item.label}
              input={{ ...item }}
              onChangeHandler={handleInputs}
              iconPosition={item.icon && item.icon.iconPosition}
              Icon={item.icon && item.icon.iconName}
              className="reservationField "
            />
          );
        })}

        <section className="inputContainerField">
          <label>Date de naissance</label>
          <AppDatePicker dateCallback={handleDateCallback} />
        </section>

        <AppButton text="Save" type="submit" />
      </form>
    </Screen>
  );
}

export default Settings;
