import React from "react";
import MUIDataTable from "mui-datatables";
import { StarHighlighter } from "../../components";
import copy from "copy-to-clipboard";

const starHighlighterFn = tableMeta => {
  const dates = tableMeta.rowData ? tableMeta.rowData.slice(-4) : [];
  const [diploma, bronz, silver, gold] = dates;
  return <StarHighlighter achievements={{ diploma, bronz, silver, gold }} />;
};

const AllAthletes = ({ isFetching, isEmpty, athletes, match }) => {
  const hideColumnOptions = { sort: false, filter: false, display: false };
  const columns = [
    { name: "id", options: hideColumnOptions },
    { name: "name", label: "Name", options: { filter: false, sort: true } },
    { name: "club", label: "Club" },
    {
      name: "achievements",
      label: "Achievements",
      options: {
        hint: "Diploma / Bronz / Silver / Gold",
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => starHighlighterFn(tableMeta)
      }
    },
    { name: "diplomaDate", options: hideColumnOptions },
    { name: "bronzDate", options: hideColumnOptions },
    { name: "silverDate", options: hideColumnOptions },
    { name: "goldDate", options: hideColumnOptions }
  ];

  const tableOptions = {
    selectableRows: false,
    filterType: "checkbox",
    rowsPerPage: 20,
    rowsPerPageOptions: [10, 20, 40],
    downloadOptions: {
      filename: "athletes.csv"
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
      {!isEmpty && (
        <MUIDataTable
          title={"Athlete List"}
          data={athletes}
          columns={columns}
          options={tableOptions}
        />
      )}
    </div>
  );
};

export default AllAthletes;
