import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LoadingOverlay from "react-loading-overlay";
import Box from "@mui/material/Box";
import "./new_assignment.css";
import {
  getClasses,
  uploadNewNotesWithoutAttach,
  uploadNewNotesWithAttach,
} from "../../services/faculty";

function NewNotesDialog(props) {
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

  const saveNote = async () => {
    try {
      setSubmitLoading(true);
      // props.activateLoading();
      setError(null);
      if (class_id === null || title === null || title === "") {
        setError("Please fill all mandatory fields first");
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
          console.log(formData);
          const { data } = await uploadNewNotesWithAttach(formData);
          console.log(data);
          setFiles(null);
          setClassValue("");
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
          console.log(details);
          const { data } = await uploadNewNotesWithoutAttach(details);
          console.log(data);
          setFiles(null);
          setClassValue("");
          setDescription("");
          setSubject(null);
          setSection(null);
          setClassID(null);
          setTitle("");
          props.openSnackBar(data.message);
        }
      }
      props.onClose();
    } catch (error) {
      console.log(error);
      // props.deactivateLoading();
      props.openSnackBar('Some Error Occurred. Try Again.');
      setSubmitLoading(false);
      // openSnackBar("Some error occured");
      // setLoading(false);
    }
    // setFiles(null);
    // setClassValue("");
    // setDescription("");
    // setSubject(null);
    // setSection(null);
    // setClassID(null);
    // setTitle("");
    setSubmitLoading(false);
    // props.deactivateLoading();
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
  const [files, setFiles] = useState(null);
  const [classValue, setClassValue] = useState("");

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
          {"Add New Notes"}
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
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                m: "auto",
                width: "fit-content",
                minWidth: "100%",
              }}
              noValidate
              autoComplete="off"
            >
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
            sx={{
              fontWeight: 'bolder'
            }} autoFocus onClick={props.onClose}>
            Cancel
          </Button>
          <Button
            sx={{
              fontWeight: 'bolder'
            }} disabled={submitLoading} variant="contained" onClick={saveNote} autoFocus>
            Add Notes
          </Button>
        </DialogActions>
      </Dialog>
    </LoadingOverlay>
  );
}

export default NewNotesDialog;
