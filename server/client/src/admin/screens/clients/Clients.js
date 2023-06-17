import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";

import { getClients } from "../../../controllers/clients";

export default function Clients() {
  const [clients, setClients] = useState([]); // we will fetch this once the page loads

  useEffect(() => {
    getClients()
      .then((list) => setClients(list))
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "firstName", headerName: "First Name", width: 170 },
    {
      field: "email",
      headerName: "E-mail",
      width: 180,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 130,
    },
    {
      field: "noOfReservations",
      headerName: "No of Reservations",
      width: 220,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 215,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/viewclient/${params.row.id}`}>
              <button className="productListEdit">More details</button>
            </Link>
            <Link to={`/admin/updateclient/${params.row.id}`}>
              <button className="productListEdit">Update</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={clients}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
