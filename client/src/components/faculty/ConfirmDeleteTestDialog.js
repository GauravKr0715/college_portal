import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import "./new_assignment.css";
import {
  deleteTestDetails
} from "../../services/faculty";

function ConfirmDeleteTestDialog(props) {

  const [submitLoading, setSubmitLoading] = useState(false);

  const deleteTest = async () => {
    try {
      setSubmitLoading(true);
      const { data } = await deleteTestDetails(props.id);
      window.location.href = props.fallbackURL;
      props.openSnackBar(data.message);
    } catch (error) {
      console.log(error);
      props.openSnackBar('Some Error Occurred. Try Again.');
      setSubmitLoading(false);
    }
    setSubmitLoading(false);
  }

  return (
    <Dialog
      maxWidth="md"
      {...props}
      aria-labelledby="responsive-dialog-title"
      scroll="body"
      onClose={() => { }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#fff !important",
          minWidth: "80vh",
        }}
        id="responsive-dialog-title"
      >
        {"Confirm Delete Test?"}
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#fff !important",
          minHeight: "fit-content",
        }}
      >

        <DialogContentText id="alert-dialog-description">
          {`Are you sure you want to delete test "${props.title}"?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: "#fff !important",
        }}
      >
        <Button
          sx={{
            fontWeight: 'bolder'
          }} autoFocus onClick={props.onClose}>
          Cancel
        </Button>
        <Button
          sx={{
            fontWeight: 'bolder'
          }} disabled={submitLoading} variant="contained" onClick={deleteTest} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteTestDialog;
