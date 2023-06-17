import React from "react";
import { HiMenu } from "react-icons/hi";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";

function Documents() {
  return (
    <Screen className="documentsScreen">
      <section>
        <HiMenu className="navbarIcon" />
        <img src="./assets/vLocLogo.png" alt="logo" className="logo" />
      </section>
      <p className="formHeaderText">Documents</p>
      <AppButton text="upload" />

      <section className="inputContainer progressSection">
        <img
          src="./assets/contractdocument.png"
          alt="contract document"
          className="documentImg"
        />
        <section className="dustbinIcon">
          <button>
            <img src="./assets/dustbinIcon.png" alt="delete" />
          </button>
        </section>
        <section>
          <p className="formHeaderText">Lorem ipsum document</p>
        </section>
      </section>

      <section className="inputContainer progressSection">
        <img
          src="./assets/contractdocument.png"
          alt="contract document"
          className="documentImg"
        />
        <section className="dustbinIcon">
          <button>
            <img src="./assets/dustbinIcon.png" alt="delete" />
          </button>
        </section>
        <section>
          <p className="formHeaderText">Lorem ipsum document</p>
        </section>
      </section>
    </Screen>
  );
}

export default Documents;
