import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import LoadingOverlay from "react-loading-overlay";
import MenuItem from "@mui/material/MenuItem";
import { GlobalVariables } from "../../environments/global_data";
import Box from "@mui/material/Box";
// import "./new_department.css";
import {
  addNewFaculty,
  getDepartments
} from "../../services/admin";

function NewFacultyDialog(props) {

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

  const addFaculty = async () => {
    try {
      setSubmitLoading(true);
      // props.activateLoading();
      setError(null);
      if (uni_id === null || uni_id === "" || full_name === null || full_name === "" || email === null || email === "" || dept === null || dept === "" || dept === 0 || yoj === null || yoj === "") {
        setError("Please fill all mandatory fields first");
      } else {
        let details = {};
        details.uni_id = uni_id;
        details.full_name = full_name;
        details.email = email;
        details.mobile = mobile;
        details.dept = dept;
        details.yoj = yoj;
        const { data } = await addNewFaculty(details);
        console.log(data);
        setUniID("");
        setFullName("");
        setEmail("");
        setMobile("");
        setDept("");
        setYOJ("");
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
  const [uni_id, setUniID] = useState("");
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dept, setDept] = useState(0);
  const [yoj, setYOJ] = useState("");

  const [departments, setDepartments] = useState([]);

  const [submitLoading, setSubmitLoading] = useState(false);

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
        {"Add a New Faculty"}
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
              id="code"
              label="*Unique ID"
              value={uni_id}
              onChange={(e) => {
                setUniID(e.target.value);
              }}
              variant="outlined"
            />
          </Box>
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
                  setDept(e.target.value);
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
            id="name"
            value={full_name}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            label="*Faculty Name"
            variant="outlined"
          />
          <TextField
            sx={{
              margin: "15px",
            }}
            id="name"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label="*Email ID"
            variant="outlined"
          />
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
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              label="Mobile Number"
              variant="outlined"
            />
            <TextField
              id="name"
              select
              value={yoj}
              sx={{
                margin: "15px", minWidth: '40%'
              }}
              onChange={(e) => {
                setYOJ(e.target.value);
              }}
              label="*Year of Joining"
              variant="outlined"
            >
              {GlobalVariables.joining_years_list.map((year) => (
                <MenuItem

                  key={year}
                  value={year}
                >
                  {year}
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
          sx={{ fontWeight: "bolder" }} disabled={submitLoading} variant="contained" onClick={addFaculty} autoFocus>
          Add Faculty
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewFacultyDialog;
