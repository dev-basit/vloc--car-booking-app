import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { clientDocs, clientInputs } from "../../../config/inputs";
import { getClient } from "../../../controllers/clients";

export default function ViewClient() {
  const [clientInfo, setClientInfo] = useState({});
  const { id } = useParams();

  // console.log("clientInfo ", clientInfo);

  useEffect(() => {
    getClient(id)
      .then((doc) => setClientInfo({ ...doc }))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            flexBasis: "15rem",
            margin: "2rem 0 1rem 2rem",
          }}
        >
          {clientInputs.map((field) => {
            if (clientInfo[field.id]) {
              return (
                <div className="userShowInfo">
                  <span className="userShowInfoTitle">{field.label}</span>
                  <span>{clientInfo[field.id]}</span>
                </div>
              );
            }

            return <></>;
          })}

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
        </div>
      </div>

      <Link to={`/admin/updateclient/${id}`}>
        <button className="productListEdit">update info</button>
      </Link>
    </div>
  );
}
