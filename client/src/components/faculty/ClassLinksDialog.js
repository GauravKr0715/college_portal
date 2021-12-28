import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./new_assignment.css";
import { addNewLink, applyLinkToClass } from "../../services/faculty";

function ClassLinksDialog(props) {
  console.log(props.links);

  const [addLinkForm, setAddLinkForm] = useState(false);
  const [link_title, setLinkTitle] = useState("");
  const [link_url, setLinkURL] = useState("");
  const [error, setError] = useState(null);
  const [cla, setClass] = useState(props.selectedClass);

  const [submitLoading, setSubmitLoading] = useState(false);

  const addLink = async () => {
    try {
      setSubmitLoading(true);
      setError(null);
      if (
        link_title === null ||
        link_title === "" ||
        link_url === null ||
        link_url === ""
      ) {
        setError("Please fill all mandatory fields first");
      } else {
        let details = {};
        details.title = link_title;
        details.url = link_url;
        const { data } = await addNewLink(details, cla.class_id);
        console.log(data);
        setLinkTitle("");
        setLinkURL("");
        props.openSnackBar(data.message);
        props.onClose();
      }
    } catch (error) {
      console.log(error);
      props.openSnackBar("Some Error Occurred. Try Again.");
      setSubmitLoading(false);
    }
    setSubmitLoading(false);
  };

  const selectLink = async (link) => {
    try {
      if (cla.link && cla.link.uid === link.uid) {

      } else {
        setSubmitLoading(true);
        const data = await applyLinkToClass(link, cla.class_id);
        props.openSnackBar(data.message);
        props.onClose();
      }
    } catch (error) {
      console.log(error);
      props.openSnackBar("Some Error Occurred. Try Again.");
      setSubmitLoading(false);
    }
  }

  return (
    <Dialog
      maxWidth="md"
      {...props}
      aria-labelledby="responsive-dialog-title"
      scroll="body"
      onClose={() => { }}
    >
      {/* <DialogTitle
        sx={{
          backgroundColor: "#fff !important",
          minWidth: "80vh",
        }}
        id="responsive-dialog-title"
      >
        {""}
      </DialogTitle> */}
      <DialogContent
        sx={{
          backgroundColor: "#fff !important",
          minHeight: "fit-content",
        }}
      >
        {props.links.length ? (
          <TableContainer
            sx={{
              backgroundColor: "#fff !important",
            }}
            component={Paper}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              {props.links.map((link, idx) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          flex: "1",
                          cursor: "pointer",
                        }}
                        className={"clickable-title multiline-head"}
                        onClick={() => { selectLink(link) }}
                      >
                        {link.title}
                        <div className="small-data">{link.url}</div>
                      </div>
                      <div
                        style={{
                          margin: "auto",
                          minWidth: "30px",
                        }}
                        className="check-mark"
                      >
                        {cla.link && cla.link.uid === link.uid && (
                          <span
                            style={{
                              color: "green",
                            }}
                            class="material-icons"
                          >
                            check_circle
                          </span>
                        )}
                      </div>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell component="th" scope="row">
                  {addLinkForm ? (
                    <>
                      <TextField
                        id="title"
                        label="Link Title"
                        sx={{
                          backgroundColor: "#fff !important",
                          margin: "15px",
                          width: "80%",
                        }}
                        value={link_title}
                        onChange={(e) => {
                          setLinkTitle(e.target.value);
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        id="title"
                        label="Link URL"
                        sx={{
                          backgroundColor: "#fff !important",
                          margin: "15px",
                          width: "80%",
                        }}
                        value={link_url}
                        onChange={(e) => {
                          setLinkURL(e.target.value);
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
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
                        </>
                      )}
                      <Button
                        variant="contained"
                        disabled={submitLoading}
                        autoFocus
                        onClick={addLink}
                        sx={{
                          fontWeight: "bolder",
                        }}
                      >
                        Add Link
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        autoFocus
                        onClick={() => {
                          setAddLinkForm(true);
                        }}
                        sx={{
                          fontWeight: "bolder",
                        }}
                      >
                        Add New Link
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        ) : (
          <>
            <TableContainer
              sx={{
                backgroundColor: "#fff !important",
              }}
              component={Paper}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableRow>
                  <TableCell component="th" scope="row">
                    No available links. Add one before.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {addLinkForm ? (
                      <>
                        <TextField
                          id="title"
                          label="Link Title"
                          sx={{
                            backgroundColor: "#fff !important",
                            margin: "15px",
                            width: "80%",
                          }}
                          value={link_title}
                          onChange={(e) => {
                            setLinkTitle(e.target.value);
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <TextField
                          id="title"
                          label="Link URL"
                          sx={{
                            backgroundColor: "#fff !important",
                            margin: "15px",
                            width: "80%",
                          }}
                          value={link_url}
                          onChange={(e) => {
                            setLinkURL(e.target.value);
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
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
                          </>
                        )}
                        <Button
                          variant="contained"
                          disabled={submitLoading}
                          autoFocus
                          onClick={addLink}
                          sx={{
                            fontWeight: "bolder",
                          }}
                        >
                          Add Link
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          autoFocus
                          onClick={() => {
                            setAddLinkForm(true);
                          }}
                          sx={{
                            fontWeight: "bolder",
                          }}
                        >
                          Add New Link
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: "#fff !important",
        }}
      >
        <Button
          sx={{
            fontWeight: "bolder",
          }}
          autoFocus
          onClick={props.onClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClassLinksDialog;
