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
import "./new_department.css";
import { GlobalVariables } from '../../environments/global_data';
import {
  addNewSubject,
  getDepartments
} from "../../services/admin";

function NewDepartmentDialog(props) {

  const getDepartmentList = async () => {
    try {
      const { data } = await getDepartments();
      setDepartments(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDepartmentList();
  }, []);

  const saveSubject = async () => {
    try {
      setSubmitLoading(true);
      setError(null);
      if (name === null || name === "" || code === null || code === "" || type === null || type === "" || sem === null || sem === "" || dept === null || dept === "" || dept === 0) {
        setError("Please fill all mandatory fields first");
      } else {
        let details = {};
        details.name = name;
        details.code = code;
        details.type = type;
        details.sem = sem;
        details.dept = dept;
        console.log(details);
        const { data } = await addNewSubject(details);
        console.log(data);
        setName("");
        setCode("");
        setType("");
        setSem("");
        setDept("");
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
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState(1);
  const [sem, setSem] = useState(1);
  const [dept, setDept] = useState(0);

  const handleDepartmentChange = (e) => {
    setDept(e.target.value);
  }

  const [departments, setDepartments] = useState([]);

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
          {"Add a New Department"}
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
            {
              departments && (

                <TextField
                  sx={{
                    margin: "15px",
                    flex: "1",
                  }}
                  id="dept"
                  select
                  label="*Select Department"
                  value={dept}
                  onChange={(e) => {
                    handleDepartmentChange(e);
                  }}
                >
                  <MenuItem
                    key={0}
                    value={0}
                  >
                    None
                  </MenuItem>
                  {departments.map((dept) => (
                    <MenuItem
                      key={dept.code}
                      value={dept.code}
                    >
                      {dept.name}
                    </MenuItem>
                  ))}
                </TextField>
              )
            }
            <TextField
              sx={{
                margin: "15px",
              }}
              id="code"
              label="*Subject Code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              variant="outlined"
            />
            <TextField
              sx={{
                margin: "15px",
              }}
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              label="*Subject Name"
              variant="outlined"
            />
            <TextField
              sx={{
                margin: "15px",
                flex: "1",
              }}
              id="sem"
              select
              label="*Select Semester"
              value={sem}
              onChange={(e) => {
                setSem(e.target.value);
              }}
            >
              {GlobalVariables.semesters.map((sem) => (
                <MenuItem
                  key={sem.value}
                  value={sem.value}
                >
                  {sem.key}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              sx={{
                margin: "15px",
                flex: "1",
              }}
              id="sem"
              select
              label="*Select Subject Type"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              {GlobalVariables.subject_types_array.map((type) => (
                <MenuItem
                  key={type.value}
                  value={type.value}
                >
                  {type.key}
                </MenuItem>
              ))}
            </TextField>
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
            sx={{ fontWeight: "bolder" }} disabled={submitLoading} variant="contained" onClick={saveSubject} autoFocus>
            Add Department
          </Button>
        </DialogActions>
      </Dialog>
    </LoadingOverlay>
  );
}

export default NewDepartmentDialog;
