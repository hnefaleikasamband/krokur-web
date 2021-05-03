import React from 'react';
import MUIDataTable from 'mui-datatables';
import { StarHighlighter } from '../../components';

const starHighlighterHelper = (tableMeta) => {
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

const Summary = ({ isFetching, athletes, club, history }) => {
  const hideColumnOptions = { sort: false, filter: false, display: false };
  const columns = [
    { name: 'id', options: hideColumnOptions },
    { name: 'name', label: 'Name', options: { filter: false, sort: true } },
    {
      name: 'ssn',
      label: 'Kennitala',
      options: { filter: false, sort: false },
    },
    {
      name: "class",
      label: "Class",
      option: { filter: true, sort: true },
    },
    {
      name: "bouts",
      label: "Bouts",
      option: { filter: false, sort: true },
    },
    {
      name: 'achievements',
      label: 'Achievements',
      options: {
        hint: 'Diploma / Bronz / Silver / Gold',
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => starHighlighterHelper(tableMeta),
      },
    },
    { name: 'diplomaDate', options: hideColumnOptions },
    { name: 'bronzDate', options: hideColumnOptions },
    { name: 'silverDate', options: hideColumnOptions },
    { name: 'goldDate', options: hideColumnOptions },
    { name: 'diplomaBoutsLeft', options: hideColumnOptions },
    { name: 'bronzBoutsLeft', options: hideColumnOptions },
    { name: 'silverBoutsLeft', options: hideColumnOptions },
    { name: 'goldBoutsLeft', options: hideColumnOptions },
  ];

  const tableOptions = {
    selectableRows: 'none',
    filterType: 'checkbox',
    rowsPerPage: 20,
    rowsPerPageOptions: [10, 20, 40],
    downloadOptions: {
      filename: 'athletes.csv',
    },
    responsive: 'scroll',
    print: false,
    viewColumns: false,
    onRowClick: (rowData) => {
      history.push(`/athlete/${rowData[0]}`);
    },
  };
  return (
    <div>
      {!isFetching && (
        <MUIDataTable title={club.name} data={athletes} columns={columns} options={tableOptions} />
      )}
    </div>
  );
};

export default Summary;
