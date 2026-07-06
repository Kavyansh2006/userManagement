import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

import "ag-grid-community/styles/ag-theme-alpine.css";
import { Input } from "antd";

function UserTable() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.user.users);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    navigate("/edit-user", { state: user });
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const columnDefs = [
    { headerName: "First Name", field: "firstName", width: 130 },
    { headerName: "Last Name", field: "lastName", width: 130 },
    { headerName: "Email", field: "email", flex: 1 },
    { headerName: "Country", field: "country", width: 120 },
    { headerName: "State", field: "state", width: 120 },
    { headerName: "Mobile", field: "mobile", width: 130 },
    { headerName: "Company", field: "company", width: 110 },
    { headerName: "Department", field: "department", width: 130 },

    {
      headerName: "Actions",
      field: "actions",
      width: 150,
      
cellRenderer: (params) => (
  <div className="action-buttons">
    <button
      className="table-btn table-btn-edit"
      onClick={() => handleEdit(params.data)}
    >
      Edit
    </button>

    <button
      className="table-btn table-btn-delete"
      onClick={() => handleDelete(params.data.id)}
    >
      Delete
    </button>
  </div>
)

    },
  ];

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <div style={{ width: "98%", margin: "20px auto" }}>
      <h2>User List (AG Grid)</h2>

      <Input
        placeholder="Search by any field"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      <div className="ag-theme-alpine-dark table-wrapper">
        <AgGridReact
          rowData={filteredUsers}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={5}
          paginationPageSizeSelector={false}
          domLayout="autoHeight"
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
}

export default UserTable;