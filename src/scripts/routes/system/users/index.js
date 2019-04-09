import React from "react";
import MUIDataTable from "mui-datatables";
import { StarHighlighter } from "../../components";
import copy from "copy-to-clipboard";

const starHighlighterHelper = tableMeta => {
  const dates = tableMeta.rowData ? tableMeta.rowData.slice(-8, -4) : [];
  const [diploma, bronz, silver, gold] = dates;
  const boutsLeft = tableMeta.rowData ? tableMeta.rowData.slice(-4) : [];
  const [diplomaLeft, bronzLeft, silverLeft, goldLeft] = boutsLeft;
  return (
    <StarHighlighter
      achievements={{ diploma, bronz, silver, gold }}
      boutsLeftToAchievement={{ diplomaLeft, bronzLeft, silverLeft, goldLeft }}
    />
  );
};

const Users = ({ isFetching, athletes }) => {
  const hideColumnOptions = { sort: false, filter: false, display: false };
  const columns = [
    { name: "id", options: hideColumnOptions },
    { name: "name", label: "Name", options: { filter: false, sort: true } },
    {
      name: "email",
      label: "Email",
      options: { filter: false, sort: false }
    },
    {
      name: "role",
      label: "Role",
      options: { filter: true, sort: true }
    },
    {
      name: "clubDisplayName",
      label: "Club",
      options: { filter: true, sort: true }
    }
  ];

  const tableOptions = {
    selectableRows: false,
    filterType: "checkbox",
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 40],
    downloadOptions: {
      filename: "users.csv"
    },
    responsive: "stacked",
    print: false,
    viewColumns: false,
    onRowClick: (rowData, { dataIndex, rowIndex }) => {
      console.log("rowData:", rowData);
      const data = rowData.reduce((acc, curr) => {
        acc += `\t${curr}`;
        return acc;
      }, "");
      copy(data.slice(data.indexOf(1)));
      console.log("dataIndex:", dataIndex, "- rowIndex:", rowIndex);
    }
  };
  return (
    <div>
      {!isFetching && (
        <MUIDataTable
          title={`Users`}
          data={athletes}
          columns={columns}
          options={tableOptions}
        />
      )}
    </div>
  );
};

export default Users;
