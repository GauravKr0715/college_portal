import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import MenuItem from "@mui/material/MenuItem";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import LoadingOverlay from "react-loading-overlay";
import Box from "@mui/material/Box";
import Autocomplete from '@mui/material/Autocomplete';
import "./new_department.css";
import {
  saveClassesForSection,
  getSubjectsAndFaculties
} from "../../services/admin";

function ClassesDialog(props) {

  useEffect(() => {
    getSubjectsAndFacultiesForSection();
  }, []);

  const getSubjectsAndFacultiesForSection = async () => {
    try {
      const data = await getSubjectsAndFaculties(props.section_id);
      setFacultyList(data.data.faculty_data);
      setSubjectList(data.data.subject_data);
      console.log(data);
    } catch (error) {
      console.log(error);
      props.openSnackBar('Some Error Occurred. Try Again.');
    }
  }

  const saveClasses = async () => {
    try {
      setSubmitLoading(true);
      setError(null);
      let err = false;
      for (let i = 0; i < classes.length; i++) {
        if (classes[i].subject_id === null || classes[i].subject_id === '' || classes[i].faculty_id === null || classes[i].faculty_id === '') {
          err = true;
          break;
        }
      }
      if (err) {
        setError("Select All fields first...")
      } else {
        const { data } = await saveClassesForSection(classes, props.section_id);
        props.openSnackBar(data.message);
        props.onClose();
      }
    } catch (error) {
      console.log(error);
      props.openSnackBar('Some Error Occurred. Try Again.');
      setSubmitLoading(false);
    }
    setSubmitLoading(false);
  };

  const [error, setError] = useState(null);

  const [faculty_list, setFacultyList] = useState([]);
  const [subject_list, setSubjectList] = useState([]);

  const [subject_label, setSubjectLabel] = useState("");
  const [faculty_label, setFacultyLabel] = useState("");

  const [classes, setClasses] = useState([
    {
      subject_id: null,
      subject_name: null,
      subject_type: null,
      subject_dept: null,
      faculty_id: null,
      faculty_name: null,
    }
  ]);

  const handleClassAdd = () => {
    const values = [...classes];
    values.push(
      {
        subject_id: null,
        subject_name: null,
        subject_type: null,
        subject_dept: null,
        faculty_id: null,
        faculty_name: null,
      });
    setClasses(values);
  }

  const handleClassRemove = (i) => {
    const values = [...classes];
    values.splice(i, 1);
    setClasses(values);
  }

  const handleSubjectChange = (sub, i) => {
    const values = [...classes];
    values[i].subject_id = sub.code;
    values[i].subject_name = sub.name;
    values[i].subject_type = sub.type;
    values[i].subject_dept = sub.dept;
    setClasses(values);
  }

  const handleFacultyChange = (faculty, i) => {
    const values = [...classes];
    values[i].faculty_id = faculty.uni_id;
    values[i].faculty_name = faculty.full_name;
    setClasses(values);
  }

  const [submitLoading, setSubmitLoading] = useState(false);

  return (

    <LoadingOverlay
      active={submitLoading}
      spinner
      text="Loading Test Sheet..."
    >
      <Dialog
        maxWidth="lg"
        {...props}
        fullWidth
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
          {"Add New Classes"}
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
              width: "100%",
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
            {
              classes && classes.map((c, i) => (
                <Box
                  sx={{
                    margin: '0.5rem 0px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <Autocomplete
                    id="subject-select"
                    sx={{ width: 300, marginRight: '7px' }}
                    options={subject_list}
                    autoHighlight
                    onChange={(event, value) => {
                      handleSubjectChange(value, i);
                      console.log(value)
                    }}
                    getOptionLabel={(option) => `[${option.code}] ${option.name}`}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {option.name} ({option.code})
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select subject"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                  {/* <TextField
                    id="faculty"
                    select
                    value={subject_label}
                    sx={{
                      margin: "15px", minWidth: '40%'
                    }}
                    onChange={(e) => { handleSubjectChange(e, i) }}
                    label="Select Subject"
                    variant="outlined"
                  >
                    {subject_list.map((subject) => (
                      <MenuItem

                        key={subject.code}
                        value={subject.code}
                      >
                        {subject.name}
                      </MenuItem>
                    ))}
                  </TextField> */}
                  <Autocomplete
                    id="faculty-select"
                    sx={{ width: 300, marginRight: '7px' }}
                    disabled={classes[i].subject_dept === null}
                    options={faculty_list.filter(faculty => faculty.dept === classes[i].subject_dept)}
                    autoHighlight
                    onChange={(event, value) => {
                      handleFacultyChange(value, i);
                      console.log(value)
                    }}
                    getOptionLabel={(option) => `${option.full_name}`}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {option.full_name}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select faculty"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                  {/* <TextField
                    id="name"
                    select
                    value={faculty_label}
                    sx={{
                      margin: "15px", minWidth: '40%'
                    }}
                    disabled={classes[i].subject_dept === null}
                    onChange={(e) => { handleFacultyChange(e, i) }}
                    label="Select Faculty"
                    variant="outlined"
                  >
                    {faculty_list.filter(faculty => faculty.dept === classes[i].subject_dept).map((faculty) => (
                      <MenuItem

                        key={faculty.uni_id}
                        value={faculty.uni_id}
                      >
                        {faculty.full_name}
                      </MenuItem>
                    ))}
                  </TextField> */}
                  {
                    classes.length !== 1 ? (
                      <Button color="error"
                        sx={{ fontWeight: "bolder" }} size="small" variant="contained" onClick={() => handleClassRemove(i)}>

                        <span
                          class="material-icons"
                        >
                          close
                        </span>
                      </Button>
                    ) : null
                  }
                </Box>
              ))
            }
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
              <Button color="success"
                sx={{ fontWeight: "bolder", maxWidth: 'fit-content' }} size="small" variant="contained" onClick={() => handleClassAdd()}>

                <span
                  class="material-icons"
                >
                  add
                </span>
              </Button>
            </Box>
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
            sx={{ fontWeight: "bolder" }} disabled={submitLoading} variant="contained" onClick={saveClasses} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LoadingOverlay>
  );
}

export default ClassesDialog;
