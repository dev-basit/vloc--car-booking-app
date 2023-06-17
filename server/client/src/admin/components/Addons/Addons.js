import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";

import AppButton from "../../../components/AppButton";
import { getAllAddons } from "../../../controllers/addons";

export default function Addons() {
  const [addons, setAddons] = useState([]); // we will fetch this once the page loads

  useEffect(() => {
    getAllAddons()
      .then((addons) => setAddons(addons))
      .catch((err) => console.log(err));
  }, []);

  console.log("addons from server ", addons);

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 150,
    },
    {
      field: "name",
      headerName: "Addon",
      width: 150,
    },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "stock",
      headerName: "Stock",
      width: 160,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/updateAddon/${params.row.id}`}>
              <button className="productListEdit">Update</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div style={{ width: "15rem" }}>
        <Link to="/admin/addAddon" className="reactRouterDomLink">
          <AppButton text="Add new addon" />
        </Link>
      </div>

      <DataGrid
        rows={addons}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
