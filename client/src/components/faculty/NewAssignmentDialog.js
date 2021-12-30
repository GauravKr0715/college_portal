import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import LoadingOverlay from "react-loading-overlay";
import Box from "@mui/material/Box";
import "./new_assignment.css";
import {
  getClasses,
  uploadNewAssignmentWithoutAttach,
  uploadNewAssignmentWithAttach,
} from "../../services/faculty";

function NewAssignmentDialog(props) {
  const getClassesForFaculty = async () => {
    try {
      props.activateLoading();
      const { data } = await getClasses();
      setClasses(data.data.classes);
    } catch (error) {
      props.deactivateLoading();
    }
    props.deactivateLoading();
  };

  useEffect(() => {
    getClassesForFaculty();
  }, []);

  const saveAssignment = async () => {
    try {
      setSubmitLoading(true);
      // props.activateLoading();
      setError(null);
      if (class_id === null || title === null || title === "") {
        setError("Please fill all mandatory fields first");
      } else if ((total_marks !== null && total_marks !== '') && (total_marks < 10 || total_marks > 100)) {
        setError("Please enter marks in the proper range (10 - 100)");
      } else {
        if (document.getElementById("attachments").files.length) {
          var formData = new FormData();
          for (const key of Object.keys(files)) {
            formData.append("attachments", files[key]);
          }
          formData.append("title", title);
          formData.append("class_id", class_id);
          formData.append("section", section);
          formData.append("subject", subject);
          if (description !== "" && description !== null) {
            formData.append("description", description);
          }
          if (due_date !== "" && due_date !== null) {
            formData.append("due_date", due_date);
          }
          if (total_marks !== "" && total_marks !== null) {
            formData.append("total_marks", total_marks);
          }
          console.log(formData);
          const { data } = await uploadNewAssignmentWithAttach(formData);
          console.log(data);
          setFiles(null);
          setClassValue("");
          setDueDate(null);
          setDescription("");
          setSubject(null);
          setSection(null);
          setClassID(null);
          setTitle("");
          props.openSnackBar(data.message);
        } else {
          let details = {};
          details.title = title;
          details.class_id = class_id;
          details.section = section;
          details.subject = subject;
          if (description !== "" && description !== null) {
            details.description = description;
          }
          if (due_date !== "" && due_date !== null) {
            details.due_date = due_date;
          }
          if (total_marks !== "" && total_marks !== null) {
            details.total_marks = total_marks;
          }
          console.log(details);
          const { data } = await uploadNewAssignmentWithoutAttach(details);
          console.log(data);
          setFiles(null);
          setClassValue("");
          setDueDate(null);
          setDescription("");
          setSubject(null);
          setSection(null);
          setClassID(null);
          setTitle("");
          props.openSnackBar(data.message);
        }
        props.onClose();
      }
    } catch (error) {
      console.log(error);
      props.openSnackBar('Some Error Occurred. Try Again.');
      // props.deactivateLoading();
      setSubmitLoading(false);
      // openSnackBar("Some error occured");
      // setLoading(false);
    }
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

  const [classes, setClasses] = useState([
    {
      class_id: "F901",
      subject_name: "Subject 1",
      section: "F9",
    },
    {
      class_id: "F902",
      subject_name: "Subject 2",
      section: "F9",
    },
  ]);
  const [title, setTitle] = useState("");
  const [class_id, setClassID] = useState(null);
  const [section, setSection] = useState(null);
  const [subject, setSubject] = useState(null);
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState(null);
  const [total_marks, setTotalMarks] = useState("");
  const [files, setFiles] = useState(null);
  const [classValue, setClassValue] = useState("");
  console.log(due_date);

  const [submitLoading, setSubmitLoading] = useState(false);

  const handleClassChange = (e) => {
    setClassValue(e.target.value);
    let selected_class = classes[e.target.value.split(":")[1]];
    setClassID(selected_class.class_id);
    setSection(selected_class.section);
    setSubject(selected_class.subject_name);
  };

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
          {"Add a New Assignment"}
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
                flex: "1",
              }}
              id="class"
              select
              label="*Select Class"
              value={classValue}
              onChange={(e) => {
                handleClassChange(e);
              }}
            >
              {classes.map((option, idx) => (
                <MenuItem
                  key={option.class_id}
                  value={`${option.subject_name} [${option.section}]:${idx}`}
                >
                  {`${option.subject_name} [${option.section}]`}
                </MenuItem>
              ))}
            </TextField>
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
                margin: "0px 15px",
              }}
              noValidate
              autoComplete="off"
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  sx={{
                    margin: "15px",
                    backgroundColor: "#fff !important",
                    flex: "1",
                  }}
                  minDateTime={new Date()}
                  showDaysOutsideCurrentMonth={true}
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
                margin: "0px 15px",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="marks_scored"
                label="Total Marks (Optional)"
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 10, max: 100 }}
                sx={{
                  backgroundColor: "#fff !important",
                  margin: "15px",
                  minWidth: '30%'
                }}
                value={total_marks}
                onChange={(e) => {
                  setTotalMarks(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <div>
                <Button
                  size="large"
                  variant="outlined"
                  sx={{
                    fontWeight: "bolder",
                  }}
                  disabled={total_marks === null || total_marks === ''}
                  onClick={() => {
                    setTotalMarks("");
                  }}
                >
                  Remove Marks
                </Button>
              </div>
            </Box>
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
                  sx={{
                    fontWeight: 'bolder'
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
                  sx={{
                    fontWeight: 'bolder'
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
          <Button
            sx={{ fontWeight: "bolder" }} autoFocus onClick={props.onClose}>
            Cancel
          </Button>
          <Button
            sx={{ fontWeight: "bolder" }} disabled={submitLoading} variant="contained" onClick={saveAssignment} autoFocus>
            Add Assignment
          </Button>
        </DialogActions>
      </Dialog>
    </LoadingOverlay>
  );
}

export default NewAssignmentDialog;
