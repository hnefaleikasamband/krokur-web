import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ClubForm } from '../../../components';

const FormDialog = ({ submitAction, buttonText, initialValues }) => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (data) => {
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
        maxWidth="xs"
      >
        {initialValues ? (
          <DialogTitle id="form-dialog-title">Edit club</DialogTitle>
        ) : (
          <DialogTitle id="form-dialog-title">Add a new club</DialogTitle>
        )}
        <DialogContent>
          <ClubForm
            onSubmit={handleSubmit}
            submitText={initialValues ? 'Update' : 'Submit'}
            onCancel={() => setOpen(false)}
            initialValues={initialValues}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
