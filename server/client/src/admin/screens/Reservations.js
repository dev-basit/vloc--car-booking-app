import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";

import "../admin.css";
import { getAllReservations } from "../../controllers/reservations";

export default function Reservations() {
  const [reservations, setReservations] = useState([]); // we will fetch this onece the page loads

  useEffect(() => {
    getAllReservations()
      .then((reservations) => setReservations(reservations))
      .catch((err) => console.log(err));
  }, []);

  console.log("reservations ", reservations);

  const columns = [
    {
      field: "customer_id",
      headerName: "Customer",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/viewclient/${params.row.customer_id}`}>
              <button className="productListEdit">View</button>
            </Link>
          </>
        );
      },
    },
    {
      field: "car_id",
      headerName: "Car",
      width: 140,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/viewcar/${params.row.car_id}`}>
              <button className="productListEdit">View</button>
            </Link>
          </>
        );
      },
    },

    {
      field: "startDate",
      headerName: "Start Date",
      width: 180,
    },
    { field: "endDate", headerName: "End Date", width: 150 },
    {
      field: "totalMonthlyPayment",
      headerName: "Price/mo",
      width: 170,
    },
    {
      field: "totalPayment",
      headerName: "Total Price",
      width: 180,
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={reservations}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
