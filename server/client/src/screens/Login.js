import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import Field from "../components/Field";
import { AuthContext } from "../context/AuthContext";
import { login } from "../controllers/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  console.log("email ", email);
  console.log("password ", password);

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("email ", email);
    console.log("password ", password);

    login(email, password)
      .then((userCredential) => {
        dispatch({ type: "LOGIN", payload: userCredential.user });
        history.push("/trip");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  return (
    <Screen className="loginScreen">
      <section>
        <img src="./assets/vLocLogo.png" alt="logo" className="logo" />
      </section>

      <form className="inputContainer" onSubmit={handleLogin}>
        <section className="inputContainerHeader">
          <p className="formHeaderText">Bienvenu</p>
          <img src="./assets/hand.png" />
        </section>

        <p
          className="formHeaderSubText"
          style={{ marginTop: "1px", padding: "0 20px", textAlign: "center" }}
        >
          Entrez vos informations pour vous connecter
        </p>

        <Field
          title="E-mail"
          input={{
            type: "text",
            id: "email",
            placeholder: "E-mail",
          }}
          Icon={<img src="./assets/person.png" />}
          onChangeHandler={(e) => setEmail(e.target.value)}
        />

        <Field
          title="Mot de passe"
          input={{
            type: "password",
            id: "password",
            placeholder: "Mot de passe",
          }}
          Icon={<img src="./assets/password.png" />}
          onChangeHandler={(e) => setPassword(e.target.value)}
        />

        <section className="forgotPassword">
          <img src="./assets/information.png" alt="information" />
          <p>Mot de passe oublié</p>
        </section>

        <AppButton type="submit" text="Connexion" className="loginButton" />
      </form>

      {error && (
        <section style={{ backgroundColor: colors.smokeWhite, padding: "1rem", borderRadius: "1rem" }}>
          <h3 style={{ color: colors.warning }}>Please enter correct credentials</h3>
        </section>
      )}

      <p style={{ color: "white" }}>
        Vous n'avez pas de compte ?
        <Link to="/signup">
          <AppButton
            text="S'inscrire"
            color={colors.black}
            backgroundColor="transparent"
            className="signupButton"
          />
        </Link>
      </p>
    </Screen>
  );
}
