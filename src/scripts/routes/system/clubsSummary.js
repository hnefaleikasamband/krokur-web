import React from "react";
import MUIDataTable from "mui-datatables";

const UsersSummary = ({ isFetching, clubs }) => {
  const hideColumnOptions = { sort: false, filter: false, display: false };
  const columns = [
    { name: "id", options: hideColumnOptions },
    { name: "name", label: "Name", options: { filter: false, sort: true } },
    {
      name: "shorthand",
      label: "Shorthand",
      options: { filter: false, sort: true }
    },
    { name: "createdAt", options: hideColumnOptions },
    { name: "updatedAt", options: hideColumnOptions }
  ];

  const tableOptions = {
    selectableRows: false,
    filterType: "checkbox",
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 15],
    downloadOptions: {
      filename: "clubs.csv"
    },
    responsive: "stacked",
    print: false,
    viewColumns: false,
    filter: false
  };
  return (
    <div>
      {!isFetching && (
        <MUIDataTable
          title={`Clubs`}
          data={clubs}
          columns={columns}
          options={tableOptions}
        />
      )}
    </div>
  );
};

export default UsersSummary;
