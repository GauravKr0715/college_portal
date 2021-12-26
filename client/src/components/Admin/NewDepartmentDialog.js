import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import LoadingOverlay from "react-loading-overlay";
import Box from "@mui/material/Box";
import "./new_department.css";
import {
  addNewDepartment,
} from "../../services/admin";

function NewDepartmentDialog(props) {

  useEffect(() => {
  }, []);

  const saveDepartment = async () => {
    try {
      setSubmitLoading(true);
      // props.activateLoading();
      setError(null);
      if (name === null || name === "" || code === null || code === "") {
        setError("Please fill all mandatory fields first");
      } else {
        let details = {};
        details.name = name;
        details.code = code;
        console.log(details);
        const { data } = await addNewDepartment(details);
        console.log(data);
        setName("");
        setCode("");
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
            <TextField
              sx={{
                margin: "15px",
              }}
              id="code"
              label="*Department Code"
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
              label="*Department Name"
              variant="outlined"
            />
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
            sx={{ fontWeight: "bolder" }} disabled={submitLoading} variant="contained" onClick={saveDepartment} autoFocus>
            Add Department
          </Button>
        </DialogActions>
      </Dialog>
    </LoadingOverlay>
  );
}

export default NewDepartmentDialog;
