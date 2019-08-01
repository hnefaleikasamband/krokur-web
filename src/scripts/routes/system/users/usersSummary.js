import React from 'react';
import MUIDataTable from 'mui-datatables';
import { UserFormDialog } from './index';

const ClubsSummary = ({ isFetching, users }) => {
  const hideColumnOptions = { sort: false, filter: false, display: false };
  const columns = [
    { name: 'id', options: hideColumnOptions },
    { name: 'name', label: 'Name', options: { filter: false, sort: true } },
    {
      name: 'email',
      label: 'Email',
      options: { filter: false, sort: true },
    },
    {
      name: 'role',
      label: 'Role',
      options: { filter: true, sort: true },
    },
    {
      name: 'clubDisplayName',
      label: 'Club',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => (!value ? 'n/a' : value),
      },
    },
    {
      name: 'disabled',
      label: 'Disabled',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => value.toString(),
      },
    },
    { name: 'club', options: hideColumnOptions },
    {
      name: 'edit',
      label: 'Edit',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) =>
          tableMeta.rowData && (
            <UserFormDialog
              submitAction={() => console.log('set actual redux action')}
              buttonText="edit"
              initialValues={{
                id: tableMeta.rowData[0],
                name: tableMeta.rowData[1],
                email: tableMeta.rowData[2],
                role: tableMeta.rowData[3],
                disabled: tableMeta.rowData[5],
              }}
            />
          ),
      },
    },
  ];

  const tableOptions = {
    selectableRows: false,
    filterType: 'checkbox',
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 15],
    downloadOptions: {
      filename: 'users.csv',
    },
    responsive: 'scroll',
    print: false,
    viewColumns: false,
  };
  return (
    <div>
      {!isFetching && (
        <MUIDataTable title={`Users`} data={users} columns={columns} options={tableOptions} />
      )}
    </div>
  );
};

export default ClubsSummary;
