import React, { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import LoadingOverlay from "react-loading-overlay";
import "../Faculty/new_assignment.css";
import {
  deleteTestSubmissionDetails
} from "../../services/student";

function ConfirmDeleteTestSubmissionDialog(props) {

  const [submitLoading, setSubmitLoading] = useState(false);

  const deleteTestSubmission = async () => {
    try {
      setSubmitLoading(true);
      const { data } = await deleteTestSubmissionDetails(props.id);
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
        {"Confirm Delete Test Submission?"}
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#fff !important",
          minHeight: "fit-content",
        }}
      >

        <DialogContentText id="alert-dialog-description">
          {`Are you sure you want to delete your submission for the test "${props.title}"?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: "#fff !important",
        }}
      >
        <Button autoFocus onClick={props.onClose}>
          Cancel
        </Button>
        <Button disabled={submitLoading} variant="contained" onClick={deleteTestSubmission} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteTestSubmissionDialog;
