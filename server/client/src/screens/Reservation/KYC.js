import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import Field from "../../components/Field";
import { clientDocs } from "../../config/inputs";
import { AuthContext } from "../../context/AuthContext";
import { addClient } from "../../controllers/clients";
import { uploadPicToFirebaseStorage } from "../../controllers/docs";

function KYC() {
  const { currentUser } = useContext(AuthContext);
  const [currentUserId, setCurrentUserId] = useState("");
  const [docs, setDocs] = useState([]);
  const history = useHistory();

  console.log("currentUser in kyc screen", currentUser);
  console.log("currentUserEmail in kyc screen", currentUserId);
  console.log("docs ", docs);

  useEffect(() => {
    setCurrentUserId(currentUser.uid);
  }, []);

  const handleAddUserInfo = (e) => {
    e.preventDefault();

    addClient(currentUserId, docs)
      .then(() => {
        console.log("docs link added succesfully");
        history.push("/trip");
      })
      .catch(() => {
        console.log("failed to add user docs link");
      });
  };

  const handleAddFile = (e) => {
    let id = e.target.id;

    uploadPicToFirebaseStorage(e, currentUserId)
      .then((downloadURL) => {
        console.log("docs file added succesfully to storage", downloadURL);
        setDocs((prev) => ({ ...prev, [id]: downloadURL }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Screen className="reservationScreen">
      <img src="./assets/level4Completed.png" />
      <button onClick={() => console.log("go back to level 3")}>
        <img src="./assets/arrow.png" className="arrow-goback" />
      </button>

      <section className="reservation-container">
        <img src="./assets/vLocLogo.png" className="reservation-logo" />

        <form className="reservation-form" onSubmit={handleAddUserInfo}>
          <p className="formHeaderText">Téléchargez vos documents</p>

          {clientDocs.map((item) => {
            return (
              <section className="KycField" key={item.id}>
                <h5>
                  {item.label} <br />
                  {item.subTitle && (
                    <p style={{ marginTop: "-.2rem", fontSize: "0.7rem" }}>{item.subtitle}</p>
                  )}
                </h5>
                <section style={{ width: "60%" }}>
                  <Field
                    input={{ ...item }}
                    className="reservationField"
                    onChangeHandler={handleAddFile}
                  />
                </section>
              </section>
            );
          })}

          <AppButton text="Continuer" type="submit" />
        </form>
      </section>
    </Screen>
  );
}

export default KYC;
