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
import "./update-assignment.css";
import {
  editTestWithoutAttach,
  editTestWithAttach,
} from "../../services/faculty";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { createMuiTheme } from "@material-ui/core";

function UpdateTestDialog(props) {
  useEffect(() => { }, []);

  const saveTest = async () => {
    try {
      setSubmitLoading(true);
      // props.activateLoading();
      setError(null);
      if (title === null || title === "" || due_date === null || due_date === '') {
        setError("Please fill all mandatory fields first");
      } else {
        if (document.getElementById("attachments").files.length) {
          var formData = new FormData();
          for (const key of Object.keys(new_files)) {
            formData.append("new_attachments", new_files[key]);
          }
          formData.append("title", title);
          if (description !== "" && description !== null) {
            formData.append("description", description);
          }
          if (due_date !== "" && due_date !== null) {
            formData.append("due_date", due_date);
          }
          for (const file of old_files) {
            formData.append("old_files", file);
          }
          const { data } = await editTestWithAttach(
            formData,
            props.test_id
          );
          console.log(data);
          setNewFiles(null);
          setDueDate(null);
          setDescription("");
          setTitle("");
          props.openSnackBar(data.message);
        } else {
          let details = {};
          details.title = title;
          if (description !== "" && description !== null) {
            details.description = description;
          }
          if (due_date !== "" && due_date !== null) {
            details.due_date = due_date;
          }
          details.old_files = old_files;
          console.log(details);
          const { data } = await editTestWithoutAttach(
            details,
            props.test_id
          );
          console.log(data);
          setNewFiles(null);
          setDueDate(null);
          setDescription("");
          setTitle("");
          props.openSnackBar(data.message);
        }
        props.onClose();
      }
    } catch (error) {
      console.log(error);
      props.openSnackBar("Some Error Occurred. Try Again.");
      // props.deactivateLoading();
      setSubmitLoading(false);
      // openSnackBar("Some error occured");
      // setLoading(false);
    }
    setNewFiles(null);
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
  const [title, setTitle] = useState(props.test.title);
  const [description, setDescription] = useState(
    props.test.description ? props.test.description : ""
  );
  const [due_date, setDueDate] = useState(new Date(props.test.due_date * 1000));
  const [old_files, setOldFiles] = useState(
    props.test.files ? props.test.files : []
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
          {"Edit Test"}
          {" • "}
          {props.test.subject}
          {" • "}
          {props.test.section}
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
            <ThemeProvider theme={defaultMaterialTheme}>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  m: "auto",
                  width: "fit-content",
                  minWidth: "90%",
                  margin: "15px",
                }}
                noValidate
                autoComplete="off"
              >
                <LocalizationProvider
                  sx={{
                    margin: "15px",
                    backgroundColor: "#fff !important",
                  }}
                  dateAdapter={AdapterDateFns}
                >
                  <DateTimePicker
                    sx={{
                      margin: "15px",
                      backgroundColor: "#fff !important",
                    }}
                    label="Select Due Date (optional)"
                    value={due_date}
                    onChange={setDueDate}
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          backgroundColor: "#fff !important",
                          margin: "15px",
                        }}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>

                <div>
                  <Button
                    size="large"
                    variant="outlined"
                    sx={{
                      fontWeight: "bolder",
                    }}
                    disabled={due_date === null}
                    onClick={() => {
                      setDueDate(null);
                    }}
                  >
                    Remove Due Date
                  </Button>
                </div>
              </Box>
            </ThemeProvider>
            <TextField
              sx={{
                margin: "15px",
              }}
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              label="*Title"
              variant="outlined"
            />
            <TextField
              sx={{
                margin: "15px",
              }}
              id="desc"
              label="Description"
              multiline
              maxRows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
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
                      href={`http://localhost:5000/tests/${file}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="file-name">
                        {file.split(props.test_id)[1].slice(1)}
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
            onClick={saveTest}
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

export default UpdateTestDialog;
