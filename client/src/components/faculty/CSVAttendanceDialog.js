import React, { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./new_assignment.css";
import {
  getCSVDataForAttendance
} from "../../services/faculty";
import { GlobalVariables } from '../../environments/global_data';

function CSVAssignmentDialog(props) {

  const [error, setError] = useState(null);
  const [select_label, setSelectLabel] = useState("");
  console.log(select_label);
  const [selected_class, setSelectedClass] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleChange = (event) => {
    setSelectedClass(event.target.value);
    setSelectLabel(event.target.value);
  };

  const downloadCSV = async () => {
    try {
      setSubmitLoading(true);
      setError(null);
      if (select_label === null || select_label === '') {
        setError('Select a class first');
      } else {
        let file_name = props.classes.filter(c => c.class_id === selected_class)[0].subject_name;
        const { data } = await getCSVDataForAttendance(selected_class);
        if (data.csv_data) {
          GlobalVariables.downloadCSVFile(data.csv_data, `[Attendance record] ${file_name}`);
          props.openSnackBar(data.message);
          props.onClose();
        }
      }
    } catch (error) {
      console.log(error);
      props.openSnackBar('Some Error Occurred. Try Again.');
      setSubmitLoading(false);
    }
    setSubmitLoading(false);
  }

  return (
    <Dialog
      {...props}
      aria-labelledby="responsive-dialog-title"
      scroll="body"
      onClose={() => { }}
      maxWidth='sm'
    >
      <DialogTitle
        sx={{
          backgroundColor: "#fff !important",
          minWidth: "80vh",
        }}
        id="responsive-dialog-title"
      >
        {"Select classt to Export CSV"}
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#fff !important",
          minHeight: "fit-content",
          padding: '0px',
          minWidth: 'fit-content',
          margin: '0px 20px 5px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
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
                padding: '0px 5px'
              }}
            >
              {error}
            </div>
            <br />
          </>
        )}
        {props.classes.length > 0 && (
          <FormControl sx={{
            minWidth: 'fit-content',
            margin: '5px 0px'
          }}>
            <InputLabel id="class_select_label">
              Select Class
            </InputLabel>
            <Select
              labelId="class_select_label"
              id="class_select"
              value={select_label}
              label="Select Class"
              onChange={handleChange}
            >
              {props.classes.map((c, idx) => (
                <MenuItem
                  value={c.class_id}
                >{`${c.subject_name} [${c.section}]`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: "#fff !important",
        }}
      >
        <Button sx={{ fontWeight: 'bolder' }} autoFocus onClick={props.onClose}>
          Cancel
        </Button>
        <Button sx={{ fontWeight: 'bolder' }} disabled={submitLoading} variant="contained" onClick={downloadCSV} autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CSVAssignmentDialog;
