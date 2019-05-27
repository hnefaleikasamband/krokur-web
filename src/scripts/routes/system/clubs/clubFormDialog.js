import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ClubForm } from '../../../components';

const FormDialog = ({ addClub }) => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (data) => {
    setOpen(false);
    console.log(data);
    addClub(data)
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Add a new club
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new club</DialogTitle>
        <DialogContent>
          <ClubForm onSubmit={handleSubmit} submitText="Submit" onCancel={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FormDialog;