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
  addNewStudent,
} from "../../services/admin";

function NewStudentDialog(props) {

  useEffect(() => {
  }, []);

  const addStudent = async () => {
    try {
      setSubmitLoading(true);
      // props.activateLoading();
      setError(null);
      if (roll_no === null || roll_no === "" || full_name === null || full_name === "" || email === null || email === "" || course === null || course === "" || yop === null || yop === "") {
        setError("Please fill all mandatory fields first");
      } else {
        let details = {};
        details.roll_no = roll_no;
        details.full_name = full_name;
        details.email = email;
        details.mobile = mobile;
        details.course = course;
        details.yop = yop;
        const { data } = await addNewStudent(details);
        console.log(data);
        setRollNo("");
        setFullName("");
        setEmail("");
        setMobile("");
        setCourse("");
        setYOP("");
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
  const [roll_no, setRollNo] = useState("");
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [course, setCourse] = useState("");
  const [yop, setYOP] = useState("");

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
        {"Add a New Student"}
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
              label="*Roll Number"
              value={roll_no}
              onChange={(e) => {
                setRollNo(e.target.value);
              }}
              variant="outlined"
            />
            <TextField
              sx={{
                margin: "15px",
                minWidth: '40%'
              }}
              select
              id="name"
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
              }}
              label="*Course"
              variant="outlined"
            >
              {GlobalVariables.courses_list.map((year) => (
                <MenuItem

                  key={year}
                  value={year}
                >
                  {year}
                </MenuItem>
              ))}
            </TextField>

          </Box>
          <TextField
            sx={{
              margin: "15px",
            }}
            id="name"
            value={full_name}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            label="*Student Name"
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
              value={yop}
              sx={{
                margin: "15px", minWidth: '40%'
              }}
              onChange={(e) => {
                setYOP(e.target.value);
              }}
              label="*Year of Passing"
              variant="outlined"
            >
              {GlobalVariables.years_list.map((year) => (
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
          sx={{ fontWeight: "bolder" }} disabled={submitLoading} variant="contained" onClick={addStudent} autoFocus>
          Add Student
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewStudentDialog;
