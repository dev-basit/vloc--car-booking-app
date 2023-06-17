import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";

import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";
import { ReservationContext } from "../../context/ReservationContext";

function Signature() {
  const { reservation, dispatch } = useContext(ReservationContext);
  const [sign, setSign] = useState({});
  const history = useHistory();

  // console.log("reservation data from context in signature screen ", reservation);

  function handleErase() {
    sign.clear();
    // console.log("sign ", sign);
  }

  async function handleSave() {
    const imageUrl = sign.getTrimmedCanvas().toDataURL("image/png");
    // console.log("imageUrl ", imageUrl);
    dispatch({ type: "addInfo", payload: { signatureUrl: imageUrl } });
    history.push("/reservation/payment");
  }

  return (
    <Screen className="reservationScreen signatureScreen">
      <img src="/assets/level6Completed.png" />
      <button onClick={() => console.log("go back to level 5")}>
        <img src="/assets/arrow.png" className="arrow-goback" />
      </button>

      <section className="reservation-container signaturePad">
        <p className="formHeaderText">Votre signature</p>
        <form className="reservation-form" style={{ backgroundColor: colors.smokeWhite }}>
          <section>
            <SignatureCanvas
              canvasProps={{ width: "300", height: "350" }}
              ref={(data) => setSign(data)}
            />
          </section>
        </form>
        <AppButton text="Effacer" onClick={handleErase} />
        <AppButton text="Payez maintenant" onClick={handleSave} />
      </section>
    </Screen>
  );
}

export default Signature;
