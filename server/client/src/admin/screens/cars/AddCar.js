import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import AppDatePicker from "../../../components/AppDatePicker";
import {
  addonsInputs,
  carDocs,
  carMaintenanceInputs,
  carRegistrationInputs,
  carCoditionInputs,
} from "../../../config/inputs";
import { addCar, getCar } from "../../../controllers/cars";
import { uploadPicToFirebaseStorage } from "../../../controllers/docs";

export default function AddCar() {
  // we will get this once the page loads
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [carAlreadyExistData, setCarAlreadyExistData] = useState({});

  //
  const [carInfo, setCarInfo] = useState({});
  const [carDates, setCarDates] = useState({});
  const [carMaintenance, setCarMaintenance] = useState({});
  const [docs, setDocs] = useState([]);
  const [carCondtion, setCarCondition] = useState({});
  const [showAddDoc, setShowAddDoc] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      setRegistrationNumber(id);
      getCar(id).then((data) => setCarAlreadyExistData(data)); // fetch and update state
    }
  }, []);

  const handleInput = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    if (e.target.type === "number") value = parseInt(value);

    setCarInfo({ ...carInfo, [id]: value });
  };

  const handleAddCar = (e, docId, data) => {
    e.preventDefault();

    addCar(docId, data).then(() => {
      setShowAddDoc(true);
    });
  };

  const handleAddDocument = (e) => {
    let id = e.target.id;

    uploadPicToFirebaseStorage(e)
      .then((downloadURL) => {
        setDocs((prev) => ({ ...prev, [id]: downloadURL }));
      })
      .catch((err) => console.log(err));
  };

  const handleAddCarMaintenance = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    if (e.target.type === "number") value = parseInt(value);

    setCarMaintenance({ ...carMaintenance, [id]: value });
  };

  const handleAddCarCondition = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    if (e.target.type === "number") value = parseInt(value);

    if (e.target.type === "file") {
      uploadPicToFirebaseStorage(e)
        .then((downloadURL) => {
          value = downloadURL;
          setCarCondition({ ...carCondtion, [id]: value });
        })
        .catch((err) => console.log(err));
    }

    setCarCondition({ ...carCondtion, [id]: value });
  };

  return (
    <div className="newUser">
      <div className="newUserItem" style={{ width: "15rem" }}>
        <label>Enter Registration Number</label>
        <input
          id="registrationNumber"
          type="text"
          value={registrationNumber}
          onChange={(e) => {
            e.preventDefault();
            setRegistrationNumber(e.target.value);
          }}
        />
      </div>

      <form
        className="newUserForm"
        onSubmit={(e) => {
          handleAddCar(e, registrationNumber, {
            ...carInfo,
            ...carMaintenance,
            ...carDates,
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
                value={carAlreadyExistData[input.id]}
              />
            </div>
          );
        })}

        {carMaintenanceInputs.map(({ id, type, label, placeholder }) => {
          if (type !== "date") {
            return (
              <div className="newUserItem" key={id} style={{ height: "70px" }}>
                <label>{label}</label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  onChange={handleAddCarMaintenance}
                />
              </div>
            );
          }

          return (
            <div className="newUserItem" key={id} style={{ height: "70px" }}>
              <label>{label}</label>
              <AppDatePicker
                className="datePicker"
                dateCallback={(date) => {
                  setCarDates({ ...carDates, [id]: date });
                }}
              />
            </div>
          );
        })}

        {carRegistrationInputs.map(({ id, label }) => {
          return (
            <div className="newUserItem" key={id} style={{ height: "70px" }}>
              <label>{label}</label>
              <AppDatePicker
                className="datePicker"
                dateCallback={(date) => {
                  setCarDates({ ...carDates, [id]: date });
                }}
              />
            </div>
          );
        })}

        <button type="submit" className="newUserButton" style={{ marginTop: "1rem" }}>
          Create
        </button>
      </form>

      {showAddDoc ? (
        <>
          <h1 className="newUserTitle">Add docs or pics</h1>
          <form
            className="newUserForm"
            onSubmit={(e) => {
              handleAddCar(e, registrationNumber, {
                ...docs,
                ...carCondtion,
              });
              history.push("/admin/cars");
            }}
          >
            {carCoditionInputs.map((input) => {
              return (
                <div className="newUserItem" key={input.id} style={{ height: "70px" }}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleAddCarCondition}
                    value={carAlreadyExistData[input.id]}
                  />
                </div>
              );
            })}

            {carDocs.map((input) => {
              return (
                <div className="newUserItem" key={input.id} style={{ height: "70px" }}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    onChange={handleAddDocument}
                    value={carAlreadyExistData[input.id]}
                  />
                </div>
              );
            })}

            <button type="submit" className="newUserButton" style={{ marginTop: "1rem" }}>
              Create
            </button>
          </form>
        </>
      ) : (
        " "
      )}
    </div>
  );
}
