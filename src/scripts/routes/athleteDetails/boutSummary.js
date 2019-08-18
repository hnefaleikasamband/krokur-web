import React from 'react';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';

const Summary = ({ isFetching, athlete, bouts, history }) => {
  const hideColumnOptions = { sort: false, filter: false, display: false };
  const columns = [
    { name: 'opponentId', options: hideColumnOptions },
    {
      name: 'boutDate',
      label: 'Date',
      options: {
        sortDirection: 'desc',
        filter: true,
        sort: true,
        customBodyRender: (data) => moment(data).format('DD MMM YYYY'),
      },
    },
    {
      name: 'organizer',
      label: 'Organizer',
      options: { filter: true, sort: true },
    },
    { name: 'class', label: 'Class', options: { filter: true, sort: true } },
    { name: 'points', label: 'Points', options: { filter: true, sort: true } },
    {
      name: 'opponentName',
      label: 'Opponent',
      options: { filter: false, sort: true },
    },
    {
      name: 'opponentClubShorthand',
      label: 'Club',
      options: { filter: true, sort: true },
    },
    { name: 'id', options: hideColumnOptions },
    { name: 'athleteClubShorthand', options: hideColumnOptions },
    { name: 'athleteId', options: hideColumnOptions },
    { name: 'athleteName', options: hideColumnOptions },
  ];

  const tableOptions = {
    selectableRows: false,
    filterType: 'checkbox',
    rowsPerPage: 15,
    rowsPerPageOptions: [10, 15, 20, 40, 80],
    downloadOptions: {
      filename: `${athlete ? athlete.name : 'athlete'}-matches.csv`,
    },
    responsive: 'stacked',
    print: false,
    viewColumns: false,
    onRowClick: (rowData) => {
      history.push(`/athlete/${rowData[0]}`);
    },
  };
  return (
    <div>
      {!isFetching && (
        <MUIDataTable title={`Matches`} data={bouts} columns={columns} options={tableOptions} />
      )}
    </div>
  );
};

export default Summary;
