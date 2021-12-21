import React, { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import LoadingOverlay from "react-loading-overlay";
import "./new_assignment.css";
import {
  deleteAssignmentDetails
} from "../../services/faculty";

function ConfirmDeleteAssignmentDialog(props) {

  const [submitLoading, setSubmitLoading] = useState(false);

  const deleteAssignment = async () => {
    try {
      setSubmitLoading(true);
      const { data } = await deleteAssignmentDetails(props.id);
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
        {"Confirm Delete Assignment?"}
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#fff !important",
          minHeight: "fit-content",
        }}
      >

        <DialogContentText id="alert-dialog-description">
          {`Are you sure you want to delete assignment "${props.title}"?`}
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
          }} disabled={submitLoading} variant="contained" onClick={deleteAssignment} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteAssignmentDialog;
