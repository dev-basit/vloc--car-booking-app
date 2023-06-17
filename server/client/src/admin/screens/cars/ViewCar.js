import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import AppButton from "../../../components/AppButton";
import { getCar } from "../../../controllers/cars";

export default function ViewCar() {
  const [carInfo, setCarInfo] = useState({});
  const { id } = useParams();

  // console.log("car info ", carInfo);

  useEffect(() => {
    getCar(id)
      .then((doc) => setCarInfo({ ...doc }))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <div style={{ width: "15rem" }}>
          <Link to="/admin/addcar">
            <AppButton text="Add new car" />
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            flexBasis: "15rem",
            margin: "2rem 0 1rem 2rem",
          }}
        >
          <div className="userShowInfo">
            <span className="userShowInfoTitle">Registration</span>
            <span>{carInfo.id}</span>
          </div>
          <div className="userShowInfo">
            <span className="userShowInfoTitle">Vehicle Identification Number</span>
            <span>{carInfo.vehicleIdentificationNumber}</span>
          </div>
          <div className="userShowInfo">
            <span className="userShowInfoTitle">Brand</span>
            <span>{carInfo.brand}</span>
          </div>
          <div className="userShowInfo">
            <span className="userShowInfoTitle">Status</span>
            <span>{carInfo.status}</span>
          </div>
          <div className="userShowInfo">
            <span className="userShowInfoTitle">Model</span>
            <span>{carInfo.model}</span>
          </div>
          <div className="userShowInfo">
            <span className="userShowInfoTitle">Rented By</span>
            <span>{carInfo.rentedBy}</span>
          </div>
          <div className="userShowInfo">
            <span className="userShowInfoTitle">Pickup Location</span>
            <span>{carInfo.pickupLocation}</span>
          </div>
          <div className="userShowInfo">
            <span className="userShowInfoTitle">Mileage</span>
            <span>{carInfo.mileage}</span>
          </div>
          <div className="userShowInfo">
            <span className="userShowInfoTitle">Previous Maintenance Mileage</span>
            <span>{carInfo.previousMaintainenanceMileage}</span>
          </div>
          <div className="userShowInfo">
            <span className="userShowInfoTitle">Next Maintenance Mileage</span>
            <span>{carInfo.nextMaintainenanceMileage}</span>
          </div>
          <div className="userShowInfo">
            <span className="userShowInfoTitle">Previous Maintenance Date</span>
            <span>{carInfo.previousMaintainenanceDate}</span>
          </div>
          <div className="userShowInfo">
            <span className="userShowInfoTitle">First Registration</span>
            <span>{carInfo.firstRegistration}</span>
          </div>
          <div className="userShowInfo">
            <span className="userShowInfoTitle">Last Registration</span>
            <span>{carInfo.lastRegistration}</span>
          </div>
          <div className="userShowInfo">
            <span className="userShowInfoTitle">Vehicle Entry Date</span>
            <span>{carInfo.vehicleEntryDate}</span>
          </div>
          <div className="userShowInfo">
            <span className="userShowInfoTitle">Vehicle Release Date</span>
            <span>{carInfo.vehicleReleaseDate}</span>
          </div>
          <div className="userShowInfo">
            <span className="userShowInfoTitle">Vehicle Release Date</span>
            <span>{carInfo.vehicleReleaseDate}</span>
          </div>
          <div className="userShowInfo">
            <span className="userShowInfoTitle">Comment</span>
            <span>{carInfo.comment}</span>
          </div>
          <div className="userShowInfo">
            <a href={carInfo.carCondition}>Car Condition</a>
          </div>
          <div className="userShowInfo">
            <a href={carInfo.greyCard}>Grey Card</a>
          </div>
          <div className="userShowInfo">
            <a href={carInfo.asurranceCard}>Assurance</a>
          </div>
        </div>
      </div>
    </div>
  );
}
