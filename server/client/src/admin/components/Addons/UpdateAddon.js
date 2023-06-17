import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { addonsInputs } from "../../../config/inputs";
import { getAddon, updateAddon } from "../../../controllers/addons";

export default function UpdateAddon() {
  const [addonInfo, setAddonInfo] = useState({});
  const [addonExistingData, setAddonExistingData] = useState({}); // we will get this once the page loads
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getAddon(id).then((data) => {
      setAddonExistingData(data);
      setAddonInfo(data);
    });
  }, [id]);

  const handleInput = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    if (e.target.type === "number") value = parseInt(value);

    setAddonInfo({ ...addonInfo, [id]: value });
  };

  const handleAddAddon = (e, docId, data) => {
    e.preventDefault();

    updateAddon(docId, data)
      .then(() => {
        console.log("Addon succesffuly updated ");
        history.push("/admin/configurations");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="newUser">
      <div className="newUserItem" style={{ width: "15rem" }}>
        <label>Addon Id</label>
        <input id="registrationNumber" type="text" value={id} readOnly />
      </div>

      <form
        className="newUserForm"
        onSubmit={(e) => {
          handleAddAddon(e, id, {
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
                value={addonInfo[input.id]}
              />
            </div>
          );
        })}

        <button type="submit" className="newUserButton">
          Create
        </button>
      </form>
    </div>
  );
}
