import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AthleteBoutForm } from "../../components";

const FormDialog = ({
  athlete,
  opponents,
  clubs,
  submitAction,
  buttonText,
  initialValues
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = data => {
    setOpen(false);
    console.log("pressed submit on bout form:", data);
    window.alert(
      "Adding a match has not been implemented, check console for data"
    );
    //submitAction(data);
  };

  return (
    <div>
      {initialValues ? (
        <IconButton aria-label="edit" onClick={() => setOpen(true)}>
          <EditIcon fontSize="small" />
        </IconButton>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
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
          <DialogTitle id="form-dialog-title">Edit match</DialogTitle>
        ) : (
          <DialogTitle id="form-dialog-title">Add a match</DialogTitle>
        )}
        <DialogContent>
          <AthleteBoutForm
            athlete={athlete}
            opponents={opponents}
            clubs={clubs}
            submitText="Submit"
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
