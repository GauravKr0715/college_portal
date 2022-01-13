import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import LoadingOverlay from "react-loading-overlay";
import Box from "@mui/material/Box";
import "../faculty/update-assignment.css";
import {
  editAssignmentSubmissionWithoutAttach,
  editAssignmentSubmissionWithAttach,
} from "../../services/student";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { createMuiTheme } from "@material-ui/core";

function UpdateAssignmentSubmissionDialog(props) {
  useEffect(() => { }, []);

  const saveAssignmentSubmission = async () => {
    try {
      setSubmitLoading(true);
      // props.activateLoading();
      setError(null);
      if (((old_files.length <= 0) && (response === '' || response === null) && (new_files === '' || new_files === null || new_files.length <= 0))) {
        setError("Please fill atleast one field first");
      } else {
        if (document.getElementById("attachments").files.length) {
          var formData = new FormData();
          for (const key of Object.keys(new_files)) {
            formData.append("new_attachments", new_files[key]);
          }
          if (response !== "" && response !== null) {
            formData.append("response", response);
          }
          for (const file of old_files) {
            formData.append("old_files", file);
          }
          console.log(formData);
          const { data } = await editAssignmentSubmissionWithAttach(
            formData,
            props.submission_id
          );
          console.log(data);
          setNewFiles(null);
          setResponse("");
          props.openSnackBar(data.message);
        } else {
          let details = {};
          details.response = response;
          details.old_files = old_files;
          console.log(details);
          const { data } = await editAssignmentSubmissionWithoutAttach(
            details,
            props.submission_id
          );
          console.log(data);
          setNewFiles(null);
          setResponse("");
          props.openSnackBar(data.message);
        }
        props.onClose();
      }
    } catch (error) {
      console.log(error);
      props.openSnackBar("Some Error Occurred. Try Again.");
      setSubmitLoading(false);
    }
    setNewFiles(null);
    setSubmitLoading(false);
  };

  const [error, setError] = useState(null);
  const [response, setResponse] = useState(props.submission.response);
  const [old_files, setOldFiles] = useState(
    props.submission.files ? props.submission.files : []
  );
  const [new_files, setNewFiles] = useState(null);

  const [submitLoading, setSubmitLoading] = useState(false);

  const defaultMaterialTheme = createMuiTheme({
    overrides: {
      MuiPaper: {
        backgroundColor: "#fff",
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
          color: "#6A148E",
          textTransform: "uppercase",
        },
        dayLabel: {
          textTransform: "uppercase",
        },
      },
      MuiPickersDay: {
        day: {
          color: "#707070",
        },
        daySelected: {
          backgroundColor: "#6A148E",
          "&:hover": {
            backgroundColor: "#6A148E",
          },
        },
        current: {
          color: "#6A148E",
        },
      },
      MuiSvgIcon: {
        root: {
          fill: "#6A148E",
        },
      },
      MuiOutlinedInput: {
        notchedOutline: {
          borderColor: "rgba(0, 0, 0, 0.23) !important",
        },
      },
    },
  });

  return (
    <LoadingOverlay active={submitLoading} spinner text="Loading Test Sheet...">
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
          {"Edit Assignment Submission"}
          {" • "}
          {props.assignment.title}
          {" • "}
          {props.assignment.subject}
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
            <div className="files-list">
              {old_files &&
                old_files.map((file, idx) => (
                  <div className="file-tab-update">
                    <a
                      style={{
                        textDecoration: "none",
                      }}
                      href={`http://localhost:5000/assignment_submissions/${file}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="file-name">
                        {file.split(props.submission_id)[1].slice(1)}
                      </div>
                    </a>
                    <div
                      className="file-btn"
                      onClick={() => {
                        setOldFiles(old_files.filter((file, i) => i !== idx));
                      }}
                    >
                      <span class="material-icons">close</span>
                    </div>
                  </div>
                ))}
            </div>
            <div
              style={{
                position: "relative",
                margin: "0 15px",
                height: "50px",
              }}
            >
              {new_files ? (
                <Button
                  variant="contained"
                  sx={{
                    fontWeight: "bolder",
                  }}
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
                  sx={{
                    fontWeight: "bolder",
                  }}
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
                  setNewFiles(e.target.files);
                  console.log(new_files);
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
          <Button
            sx={{ fontWeight: "bolder" }}
            autoFocus
            onClick={props.onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={submitLoading}
            variant="contained"
            onClick={saveAssignmentSubmission}
            autoFocus
            sx={{ fontWeight: "bolder" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LoadingOverlay>
  );
}

export default UpdateAssignmentSubmissionDialog;
