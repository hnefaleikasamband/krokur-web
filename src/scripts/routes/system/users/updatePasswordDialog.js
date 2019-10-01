import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PasswordIcon from '@material-ui/icons/VpnKey';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ChangeUserPasswordForm } from '../../../components';

const FormDialog = ({ submitAction, userId, userName }) => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (data) => {
    setOpen(false);
    submitAction(data);
  };

  return (
    <div title="change password">
      <IconButton aria-label="password" onClick={() => setOpen(true)}>
        <PasswordIcon fontSize="small" />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">
          Update Password for <span>{userName}</span>
        </DialogTitle>
        <DialogContent>
          <ChangeUserPasswordForm
            userId={userId}
            submitText="update"
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
