import React from 'react';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core';
import { UserFormDialog, UpdatePasswordDialog } from './index';
import { DisabledSwitch } from '../../../components/forms/helpers';

const useStyles = makeStyles({
  actionContainer: {
    display: 'flex',
  },
});

const UsersSummary = ({
  isFetching,
  users,
  editAction,
  setDisabledValue,
  clubs,
  changePassword,
}) => {
  const classes = useStyles();
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
        sort: true,
        customBodyRender: (value) => (!value ? 'n/a' : value),
      },
    },
    {
      name: 'disabled',
      label: 'Disabled',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta) => (
          <DisabledSwitch initValue={value} id={tableMeta.rowData[0]} onChange={setDisabledValue} />
        ),
      },
    },
    { name: 'club', options: hideColumnOptions },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) =>
          tableMeta.rowData && (
            <div className={classes.actionContainer}>
              <UserFormDialog
                submitAction={editAction}
                buttonText="edit"
                clubs={clubs}
                initialValues={{
                  id: tableMeta.rowData[0],
                  name: tableMeta.rowData[1],
                  email: tableMeta.rowData[2],
                  role: tableMeta.rowData[3],
                  club: tableMeta.rowData[6],
                  disabled: tableMeta.rowData[5],
                }}
              />
              <UpdatePasswordDialog
                userId={tableMeta.rowData[0]}
                userName={tableMeta.rowData[1]}
                submitAction={changePassword}
              />
            </div>
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
      filename: 'users.csv',
    },
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

export default UsersSummary;
