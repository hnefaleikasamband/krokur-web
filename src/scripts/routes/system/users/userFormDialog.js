import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { UserForm } from '../../../components';

const FormDialog = ({ submitAction, buttonText, initialValues, clubs }) => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (data) => {
    console.log(data);
    setOpen(false);
    submitAction(data);
  };

  return (
    <div>
      {initialValues ? (
        <IconButton aria-label="edit" onClick={() => setOpen(true)}>
          <EditIcon fontSize="small" />
        </IconButton>
      ) : (
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            {buttonText}
          </Button>
        )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
      >
        {initialValues ? (
          <DialogTitle id="form-dialog-title">Edit user</DialogTitle>
        ) : (
            <DialogTitle id="form-dialog-title">Add a new user</DialogTitle>
          )}
        <DialogContent>
          <UserForm
            onSubmit={handleSubmit}
            submitText={initialValues ? 'Update' : 'Submit'}
            onCancel={() => setOpen(false)}
            initialValues={initialValues}
            clubs={clubs}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
