import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import MenuItem from "@mui/material/MenuItem";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import LoadingOverlay from "react-loading-overlay";
import Box from "@mui/material/Box";
import Autocomplete from '@mui/material/Autocomplete';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./new_department.css";
import {
  saveClassesForSection,
  getSubjectsAndFaculties
} from "../../services/admin";
import { GlobalVariables } from '../../environments/global_data';

function ClassesDialog(props) {

  // const [error, setError] = useState(null);

  const [orig_class, setOrigClass] = useState(props.getOrigCLassID());

  const [selected_class, setSelectedClass] = useState(props.getOrigCLassID());

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
          {"Select Class"}
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
            <TableContainer
              sx={{
                backgroundColor: "#fff !important",
              }}
              component={Paper}
            >
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableBody>
                  <TableRow
                    onClick={() => {
                      props.onCloseWithChange("ABC123");
                    }}
                    key={'ABC123'}>
                    <TableCell
                      sx={{
                        "&:hover": {
                          backgroundColor: '#d6cdcd',
                          cursor: "pointer",
                        }
                      }} component="th" scope="row">

                      <Box
                        sx={{
                          margin: '0.25rem 0px',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '15px',
                          fontWeight: 'bolder',
                          cursor: 'pointer'
                        }}>

                        <div className={"clickable-title multiline-head"}>
                          {`[N/A] Unalloted - N/A`}
                        </div>
                        {
                          props.getOrigCLassID() === 'ABC123' && (
                            <span
                              style={{
                                color: "green",
                                marginLeft: '5px'
                              }}
                              class="material-icons"
                            >
                              check_circle
                            </span>
                          )
                        }
                      </Box>
                    </TableCell>

                  </TableRow>
                  {props.classes && props.classes.map((c, i) => (
                    <TableRow
                      onClick={() => {
                        props.onCloseWithChange(c.class_id);
                      }}
                      key={c.class_id}>
                      <TableCell
                        sx={{
                          "&:hover": {
                            backgroundColor: '#d6cdcd',
                            cursor: "pointer",
                          }
                        }} component="th" scope="row">

                        <Box
                          sx={{
                            margin: '0.25rem 0px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '15px',
                            fontWeight: 'bolder',
                            cursor: 'pointer'
                          }}>
                          <div className={"clickable-title multiline-head"}>
                            {`[${c.subject_id}] ${c.subject_name} - ${c.faculty_name} (${GlobalVariables.subject_types[c.subject_type]})`}
                          </div>
                          {
                            props.getOrigCLassID() === c.class_id && (
                              <span
                                style={{
                                  color: "green",
                                  marginLeft: '5px'
                                }}
                                class="material-icons"
                              >
                                check_circle
                              </span>
                            )
                          }
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#fff !important",
          }}
        >
          <Button
            sx={{ fontWeight: "bolder" }} autoFocus onClick={() => props.onCloseWithoutChange()}>
            Cancel
          </Button>
          {/* <Button
            sx={{ fontWeight: "bolder" }} disabled={submitLoading} variant="contained" onClick={saveSlotDetails} autoFocus>
            Save
          </Button> */}
        </DialogActions>
      </Dialog>
    </LoadingOverlay>
  );
}

export default ClassesDialog;
