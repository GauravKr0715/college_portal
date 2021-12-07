import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import LoadingOverlay from "react-loading-overlay";
import Box from "@mui/material/Box";
import "../Faculty/new_assignment.css";
import {
  uploadNewTestSubmissionWithoutAttach,
  uploadNewTestSubmissionWithAttach,
} from "../../services/student";

function NewTestDialog(props) {

  useEffect(() => {
    // alert(props.uid);
  }, []);

  const saveTestSubmission = async () => {
    try {
      setSubmitLoading(true);
      // props.activateLoading();
      setError(null);
      if (((response === '' || response === null) && (files === '' || files === null || files.length <= 0))) {
        setError("Please fill atleast one field first");
      } else {
        if (document.getElementById("attachments").files.length) {
          var formData = new FormData();
          for (const key of Object.keys(files)) {
            formData.append("attachments", files[key]);
          }
          if (response !== "" && response !== null) {
            formData.append("response", response);
          }
          formData.append("test_id", props.uid);
          const { data } = await uploadNewTestSubmissionWithAttach(formData);
          console.log(data);
          setFiles(null);
          setResponse("");
          props.openSnackBar(data.message);
          props.onClose();
        } else {
          let details = {};
          if (response !== "" && response !== null) {
            details.response = response;
          }
          details.test_id = props.uid;
          console.log(details);
          const { data } = await uploadNewTestSubmissionWithoutAttach(details);
          console.log(data);
          setFiles(null);
          setResponse("");
          props.openSnackBar(data.message);
          props.onClose();
        }
      }
      setFiles(null);
    } catch (error) {
      console.log(error);
      props.openSnackBar('Some Error Occurred. Try Again.');
      // props.deactivateLoading();
      setSubmitLoading(false);
      // openSnackBar("Some error occured");
      // setLoading(false);
    }
    setFiles(null);
    // setFiles(null);
    // setClassValue("");
    // setDueDate(null);
    // setDescription("");
    // setSubject(null);
    // setSection(null);
    // setClassID(null);
    // setTitle("");
    setSubmitLoading(false);
    // props.deactivateLoading();
    // props.onClose();
  };

  const [error, setError] = useState(null);

  const [response, setResponse] = useState("");
  const [files, setFiles] = useState(null);

  const [submitLoading, setSubmitLoading] = useState(false);

  return (

    <LoadingOverlay
      active={submitLoading}
      spinner
      text="Loading Test Sheet..."
    >
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
          {"Add a New Response"}
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#fff !important",
            minHeight: "fit-content",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              m: "auto",
              width: "fit-content",
              minWidth: "100%",
            }}
            noValidate
            autoComplete="off"
          >
            {error && (
              <>
                <div
                  className="err"
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "15px",
                    display: "block",
                  }}
                >
                  {error}
                </div>
                <br />
              </>
            )}
            <TextField
              sx={{
                margin: "15px",
              }}
              id="response"
              label="Response"
              multiline
              maxRows={4}
              value={response}
              onChange={(e) => {
                setResponse(e.target.value);
              }}
              variant="outlined"
            />
            <div
              style={{
                position: "relative",
                margin: "0 15px",
                height: "50px",
              }}
            >
              {files ? (
                <Button
                  variant="contained"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    height: "50px",
                    width: "50%",
                    cursor: "pointer",
                  }}
                >
                  {document.getElementById("attachments").files.length} file(s)
                  selected
                </Button>
              ) : (
                <Button
                  variant="contained"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    height: "50px",
                    width: "50%",
                    cursor: "pointer",
                  }}
                >
                  Select Attachments
                </Button>
              )}

              <input
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  height: "50px",
                  width: "50%",
                  opacity: "0",
                  cursor: "pointer",
                }}
                sx={{
                  margin: "15px",
                }}
                type="file"
                name="attachments"
                id="attachments"
                multiple
                onChange={(e) => {
                  setFiles(e.target.files);
                  console.log(files);
                }}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#fff !important",
          }}
        >
          <Button autoFocus onClick={props.onClose}>
            Cancel
          </Button>
          <Button disabled={submitLoading} variant="contained" onClick={saveTestSubmission} autoFocus>
            Add Response
          </Button>
        </DialogActions>
      </Dialog>
    </LoadingOverlay>
  );
}

export default NewTestDialog;
