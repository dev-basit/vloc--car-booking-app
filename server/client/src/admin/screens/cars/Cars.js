import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";

import AppButton from "../../../components/AppButton";
import { getAllCars } from "../../../controllers/cars";

export default function Cars() {
  const [cars, setCars] = useState([]); // we will fetch this once the page loads

  // console.log("cars ", cars);

  useEffect(() => {
    getAllCars()
      .then((cars) => setCars(cars))
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    { field: "id", headerName: "Registration", width: 170 },
    {
      field: "rentedBy",
      headerName: "Rented By",
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 130,
    },
    {
      field: "model",
      headerName: "Model",
      width: 130,
    },
    {
      field: "mileage",
      headerName: "Mileage",
      width: 140,
    },
    {
      field: "pickupLocation",
      headerName: "Pickup Location",
      width: 180,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 215,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/viewcar/${params.row.id}`}>
              <button className="productListEdit">More details</button>
            </Link>
            <Link to={`/admin/addcar/${params.row.id}`}>
              <button className="productListEdit">Update</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div style={{ flex: 4 }}>
        <Link to="/admin/addcar" className="reactRouterDomLink">
          <AppButton text="Add new car" />
        </Link>
      </div>
      <div className="productList">
        <DataGrid
          rows={cars}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          checkboxSelection
        />
      </div>
    </div>
  );
}
