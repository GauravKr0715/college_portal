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
  addNewSection,
  getDepartments
} from "../../services/admin";

function NewSectionDialog(props) {

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

  const saveSection = async () => {
    try {
      setSubmitLoading(true);
      setError(null);
      if (name === null || name === "" || year === null || year === "" || dept === null || dept === "" || dept === 0) {
        setError("Please fill all mandatory fields first");
      } else {
        let details = {};
        details.name = name;
        details.year = year;
        details.dept = dept;
        console.log(details);
        const { data } = await addNewSection(details);
        console.log(data);
        setName("");
        setYear("");
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
  const [year, setYear] = useState(1);
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
          {"Add a New Section"}
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <TextField
                sx={{
                  margin: "15px",
                }}
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                label="*Section Name"
                variant="outlined"
              />
              <TextField
                sx={{
                  margin: "15px",
                  flex: "1",
                }}
                id="sem"
                select
                label="*Select Year"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
              >
                {GlobalVariables.years.map((year) => (
                  <MenuItem
                    key={year.value}
                    value={year.value}
                  >
                    {year.key}
                  </MenuItem>
                ))}
              </TextField>
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
            sx={{ fontWeight: "bolder" }} disabled={submitLoading} variant="contained" onClick={saveSection} autoFocus>
            Add Section
          </Button>
        </DialogActions>
      </Dialog>
    </LoadingOverlay>
  );
}

export default NewSectionDialog;
