import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { addClient, getClient } from "../../../controllers/clients";
import { clientDocs } from "../../../config/inputs";

export default function UpdateClient() {
  const [inputs, setInputs] = useState({
    role: "Customer",
    isApproved: "No",
  });
  const [clientInfo, setClientInfo] = useState({});
  const { id } = useParams();
  const history = useHistory();

  // console.log("id of client to be updated ", id);
  console.log("client permissions ", clientInfo);
  console.log("inputs ", inputs);

  useEffect(() => {
    getClient(id)
      .then((data) => {
        setClientInfo(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddClient = async (e, docId, data) => {
    e.preventDefault();
    console.log("customer permissions before adding ", data);
    addClient(docId, data)
      .then(() => history.push("/admin/clients"))
      .catch((err) => console.log(err));
    // console.log("inputs ", inputs);
  };

  const handleInput = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    setInputs({ ...inputs, [id]: value });
  };

  return (
    <div className="newUser">
      <section style={{ width: "25%" }}>
        <form
          className="newUserForm"
          onSubmit={(e) => {
            handleAddClient(e, id, inputs);
          }}
        >
          <h2 className="newUserTitle">Update permission</h2>

          <section className="inputContainerField selectContainer">
            <label htmlFor="role">Role</label>
            <section>
              <select name="role" id="role" className="options" onChange={handleInput}>
                <option value="Customer">Customer</option>
                <option value="Employer">Employer</option>
                <option value="Admin">Admin</option>
              </select>
            </section>
          </section>

          <section className="inputContainerField selectContainer">
            <label htmlFor="isApproved">Approved</label>
            <section>
              <select
                name="isApproved"
                id="isApproved"
                className="options"
                onChange={handleInput}
              >
                <option value={clientInfo.isApproved}>{clientInfo.isApproved}</option>
                {clientInfo.isApproved !== "No" && <option value="No">No</option>}
                {clientInfo.isApproved !== "Yes" && <option value="Yes">Yes</option>}
              </select>
            </section>
          </section>

          {clientDocs.map((field) => {
            if (clientInfo[field.id]) {
              return (
                <div className="userShowInfo">
                  <a href={clientInfo[field.id]} className="userShowInfoTitle">
                    {field.label}
                  </a>
                </div>
              );
            }

            return <></>;
          })}

          <button type="submit" className="newUserButton">
            Update
          </button>
        </form>
      </section>
    </div>
  );
}
