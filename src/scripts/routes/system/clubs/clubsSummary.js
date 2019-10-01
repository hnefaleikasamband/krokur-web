import React from 'react';
import MUIDataTable from 'mui-datatables';
import { ClubFormDialog } from '../clubs';

const ClubsSummary = ({ isFetching, clubs, editAction }) => {
  const hideColumnOptions = { sort: false, filter: false, display: false };
  const columns = [
    { name: 'id', options: hideColumnOptions },
    { name: 'name', label: 'Name', options: { filter: false, sort: true } },
    {
      name: 'shorthand',
      label: 'Shorthand',
      options: { filter: false, sort: true },
    },
    { name: 'createdAt', options: hideColumnOptions },
    { name: 'updatedAt', options: hideColumnOptions },
    {
      name: 'edit',
      label: 'Edit',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) =>
          tableMeta.rowData && (
            <ClubFormDialog
              submitAction={editAction}
              buttonText="edit"
              initialValues={{
                id: tableMeta.rowData[0],
                name: tableMeta.rowData[1],
                shorthand: tableMeta.rowData[2],
              }}
            />
          ),
      },
    },
  ];

  const tableOptions = {
    selectableRows: 'none',
    filterType: 'checkbox',
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
    downloadOptions: {
      filename: 'clubs.csv',
    },
    print: false,
    viewColumns: false,
    filter: false,
  };
  return (
    <div>
      {!isFetching && (
        <MUIDataTable title={`Clubs`} data={clubs} columns={columns} options={tableOptions} />
      )}
    </div>
  );
};

export default ClubsSummary;
