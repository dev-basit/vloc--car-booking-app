import { useState } from "react";
import { useHistory } from "react-router-dom";

import { addonsInputs } from "../../../config/inputs";
import { addAddon } from "../../../controllers/addons";

export default function AddAddon() {
  const [addonInfo, setAddonInfo] = useState({});
  const history = useHistory();

  const handleInput = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    if (id === "price") value = Number(parseFloat(value).toFixed(2));
    console.log("id ", id, " value ", value, typeof value);

    setAddonInfo({ ...addonInfo, [id]: value });
  };

  const handleAddAddon = (e, data) => {
    e.preventDefault();

    addAddon(data)
      .then(() => {
        history.push("/admin/configurations");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="newUser">
      <form
        className="newUserForm"
        onSubmit={(e) => {
          handleAddAddon(e, {
            ...addonInfo,
          });
        }}
      >
        {addonsInputs.map((input) => {
          return (
            <div className="newUserItem" key={input.id}>
              <label>{input.label}</label>
              <input
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                onChange={handleInput}
              />
            </div>
          );
        })}

        <button type="submit" className="newUserButton" style={{ marginTop: "1rem" }}>
          Create
        </button>
      </form>
    </div>
  );
}
