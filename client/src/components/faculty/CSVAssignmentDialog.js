import React, { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./new_assignment.css";
import {
  getCSVDataForAssignment
} from "../../services/faculty";
import { GlobalVariables } from '../../environments/global_data';

function CSVAssignmentDialog(props) {

  const [submitLoading, setSubmitLoading] = useState(false);

  const downloadCSV = async () => {
    try {
      setSubmitLoading(true);
      const { data } = await getCSVDataForAssignment(props.assignment_id, type);
      if (data.csv_data) {
        GlobalVariables.downloadCSVFile(data.csv_data, file_name);
        props.openSnackBar(data.message);
        props.onClose();
      }
    } catch (error) {
      console.log(error);
      props.openSnackBar('Some Error Occurred. Try Again.');
      setSubmitLoading(false);
    }
    setSubmitLoading(false);
  }

  const [type, setType] = useState("1");
  const [file_name, setFileName] = useState("[All Students]" + props.assignment_title.toLowerCase().split(' ').join('-'));

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
        {"Select type of CSV Export"}
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#fff !important",
          minHeight: "fit-content",
          padding: '0px',
          maxWidth: 'fit-content',
          margin: '0px auto'
        }}
      >
        <RadioGroup
          sx={{
            maxWidth: 'max-content',
            padding: '0px 15px'
          }}
          aria-label="type"
          name="radio-buttons-group"
          value={type}
          onChange={(e) => {
            const t = e.target.value;
            console.log(t);
            setType(e.target.value);
            if (e.target.value == 1) {
              setFileName("[All Students]" + props.assignment_title.toLowerCase().split(' ').join('-'));
            } else if (e.target.value == 2) {
              setFileName("[Submissions]" + props.assignment_title.toLowerCase().split(' ').join('-'));
            } else {
              setFileName("[Non Submissions]" + props.assignment_title.toLowerCase().split(' ').join('-'));
            }
          }}
        >
          <FormControlLabel value="1" control={<Radio />} label="All Students" />
          <FormControlLabel value="2" control={<Radio disabled={props.no_of_submissions == 0} />} label="Students with Submission" />
          <FormControlLabel value="3" control={<Radio />} label="Students without Submission" />
        </RadioGroup>
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
