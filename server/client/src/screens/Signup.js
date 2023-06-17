import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import Field from "../components/Field";
import { createUser } from "../controllers/auth";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  function handleSignup(e) {
    e.preventDefault();

    console.log("email ", email);
    console.log("password ", password);

    createUser(email, password)
      .then((userCredential) => {
        dispatch({ type: "LOGIN", payload: userCredential.user });
        history.push("/settings");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }

  return (
    <Screen className="loginScreen">
      <section>
        <img src="./assets/vLocLogo.png" alt="logo" className="logo" />
      </section>

      <form className="inputContainer" onSubmit={handleSignup}>
        <p className="formHeaderSubText">Créer un compte</p>

        <Field
          title="E-mail"
          input={{
            type: "email",
            id: "email",
            placeholder: "E-mail",
          }}
          onChangeHandler={(e) => setEmail(e.target.value)}
          Icon={<img src="./assets/person.png" />}
        />

        <Field
          title="Mot de passe"
          input={{
            type: "password",
            id: "password",
            placeholder: "Mot de passe",
          }}
          onChangeHandler={(e) => setPassword(e.target.value)}
          Icon={<img src="./assets/password.png" />}
        />

        <AppButton text="S'inscrire" type="submit" className="loginButton" />
      </form>
    </Screen>
  );
}
