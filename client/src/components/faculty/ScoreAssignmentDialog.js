import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import LoadingOverlay from "react-loading-overlay";
import Box from "@mui/material/Box";
import "./update-assignment.css";
import "./score.css";
import { scoreAssignmentSubmission } from "../../services/faculty";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { createMuiTheme } from "@material-ui/core";

function ScoreAssignmentDialog(props) {
  useEffect(() => { }, []);

  const saveScore = async () => {
    try {
      setSubmitLoading(true);
      // props.activateLoading();
      setError(null);
      if (marks_scored === null || marks_scored === "") {
        setError("Please fill all mandatory fields first");
      } else if (+marks_scored < 0 || +marks_scored > props.assignment.total_marks) {
        setError(`Please enter marks in the proper range (0 - ${props.assignment.total_marks})`);
      } else {
        let details = {};
        details.marks_scored = marks_scored;
        console.log(details);
        const { data } = await scoreAssignmentSubmission(
          details,
          props.submission_id
        );
        console.log(data);
        setMarksScored(null);
        props.openSnackBar(data.message);
        props.onClose();
      }
    } catch (error) {
      console.log(error);
      props.openSnackBar("Some Error Occurred. Try Again.");
      // props.deactivateLoading();
      setSubmitLoading(false);
      // openSnackBar("Some error occured");
      // setLoading(false);
    }
    setMarksScored(null);
    setSubmitLoading(false);
  };

  const [error, setError] = useState(null);
  const [marks_scored, setMarksScored] = useState(
    props.submission.marks_scored ? +props.submission.marks_scored : null
  );

  const [submitLoading, setSubmitLoading] = useState(false);

  const defaultMaterialTheme = createMuiTheme({
    overrides: {
      MuiPaper: {
        backgroundColor: "#fff",
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
          color: "#6A148E",
          textTransform: "uppercase",
        },
        dayLabel: {
          textTransform: "uppercase",
        },
      },
      MuiPickersDay: {
        day: {
          color: "#707070",
        },
        daySelected: {
          backgroundColor: "#6A148E",
          "&:hover": {
            backgroundColor: "#6A148E",
          },
        },
        current: {
          color: "#6A148E",
        },
      },
      MuiSvgIcon: {
        root: {
          fill: "#6A148E",
        },
      },
      MuiOutlinedInput: {
        notchedOutline: {
          borderColor: "rgba(0, 0, 0, 0.23) !important",
        },
      },
    },
  });

  return (
    <LoadingOverlay active={submitLoading} spinner text="Loading Test Sheet...">
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
          {"Score Assignment"}
          {" • "}
          {props.assignment.title}
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
              margin: "10px 0px",
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
                alignItems: "center",
                m: "auto",
                width: "fit-content",
                minWidth: "90%",
                margin: "0px 15px",
              }}
              noValidate
              autoComplete="off"
            >
              {/* here comes the scoring dilaog boxes */}

              <TextField
                id="marks_scored"
                label="Marks Scored"
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0, max: `${props.assignment.total_marks}` }}
                value={marks_scored}
                onChangeCapture={(e) => {
                  setMarksScored(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div className="total-marks-container">{`/ ${props.assignment.total_marks}`}</div>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#fff !important",
          }}
        >
          <Button
            sx={{ fontWeight: "bolder" }}
            autoFocus
            onClick={props.onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={submitLoading}
            variant="contained"
            onClick={saveScore}
            autoFocus
            sx={{ fontWeight: "bolder" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LoadingOverlay>
  );
}

export default ScoreAssignmentDialog;
