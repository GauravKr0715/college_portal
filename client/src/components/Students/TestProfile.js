import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { faculty_sidebar_data } from "../../environments/sidebar_data";
import "./student-assignment.css";
import { Link, useRouteMatch } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import Paper from "@mui/material/Paper";
import NewTestSubmissionDialog from "./NewTestSubmissionDialog";
import { getTestDetails } from "../../services/student";
import StudentAppBar from './StudentAppBar';
import ConfirmDeleteTestSubmissionDialog from "./ConfirmDeleteTestSubmissionDialog";
import UpdateTestSubmissionDialog from './UpdateTestSubmissionDialog';
import Menu from "@mui/material/Menu";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const StyledLoader = styled(LoadingOverlay)(({ theme }) => ({
  height: "inherit",
}));

const SnackBarButton = styled(Button)(({ theme }) => ({
  fontWeight: "bold",
  color: "#fff",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function TestProfile(props) {
  let { url, path } = useRouteMatch();
  const curr_url = "/" + url.split("/")[1];
  const id = url.split("/")[3];

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const menuId = "primary-search-account-menu";
  const [loading, setLoading] = useState(false);

  const [classes, setClasses] = useState([
    {
      class_id: "123",
      subject_name: "Subject 1",
      faculty_name: "Faculty 1",
    },
    {
      class_id: "456",
      subject_name: "Subject 2",
      faculty_name: "Faculty 2",
    },
    {
      class_id: "789",
      subject_name: "Subject 3",
      faculty_name: "Faculty 3",
    },
  ]);

  const [status_filter, setStatusFilter] = useState("All");
  const [subject_filter, setSubjectFIlter] = useState("All");

  const [test, setTest] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [result, setResult] = useState(null);

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Test Message");

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const onDialogClose = () => {
    setDialogOpen(false);
    testDetails();
  };

  const [moreMenuanchorEl, setMoreMenuAnchorEl] = React.useState(null);
  const moreMenuOpen = Boolean(moreMenuanchorEl);

  const moreMenuHandleClick = (e) => {
    setMoreMenuAnchorEl(e.currentTarget);
  };
  const moreMenuHandleClose = () => {
    setMoreMenuAnchorEl(null);
  };

  const onDeleteConfirmDialogClose = () => {
    setDeleteConfirmDialog(false);
    testDetails();
  };

  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false);

  const onEditDialogClose = () => {
    setEditDialog(false);
    testDetails();
  };

  const [editDialog, setEditDialog] = useState(false);

  const testDetails = async () => {
    try {
      setLoading(true);
      const { data } = await getTestDetails(id);
      setTest(data.test_data);
      setSubmission(data.submission_data);
      setResult(data.result_obj);
      console.log(data);
    } catch (error) {
      console.log(error);
      openSnackBar("Some error occured");
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    testDetails();
  }, []);

  const openSnackBar = (msg) => {
    setSnackbarMessage(msg);
    setSnackbar(true);
  };

  const closeSnackBar = () => {
    setSnackbar(false);
  };
  return (
    <>
      <LoadingOverlay
        active={loading}
        spinner
        text="Loading Test Sheet..."
      >
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <StudentAppBar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose}/>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleDrawerClose}
              >
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            {/* <Divider /> */}
            <List>
              {faculty_sidebar_data.map((section, idx) => (
                <Link to={`${curr_url}${section.link}`}>
                  <ListItem button key={section.text}>
                    <ListItemIcon>
                      <span class="material-icons">{section.icon}</span>
                      {/* <img className="sideBarIcon" src={`${section.icon}`} alt="" /> */}
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    </ListItemIcon>
                    <ListItemText primary={section.text} />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}>
            <DrawerHeader />
            <div className="student-ass-profile-main-container">
              {test && (
                <div className="student-pro-ass-top-container">
                  <div className="stu-top-left-container">
                    <div className="stu-ass-details-container">
                      <div className="details-tab">
                        <div className="details-bold ass-head-head mega-head">
                          {test.title}
                        </div>
                      </div>
                      {test.description && (
                        <div className="details-tab ">
                          Description:{" "}
                          <div className="details-bold ass-head-head ">
                            {test.description}
                          </div>
                        </div>
                      )}
                      <div className="details-tab ">
                        {test.subject}
                        {" ??? "}
                        {test.faculty_name}
                      </div>
                      {result && (
                        <div className="details-tab ">
                          Status:{" "}
                          <div className="details-bold ass-head-head ">
                            <div
                              className={`stu-pro-cell-status ${result.status_class}`}
                            >
                              {`${result.completion_status}${result.time_status}`}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="details-tab ">
                        Created At:{" "}
                        <div className="details-bold ass-head-head ">
                          {moment(test.createdAt * 1000).format("llll")}
                        </div>
                      </div>
                      <div className="details-tab ">
                        Due By:{" "}
                        <div className="details-bold ass-head-head ">
                          {moment(test.due_date * 1000).format("llll")}
                        </div>
                      </div>
                      {test.files && (
                        <div className="details-tab ">
                          <div className="files-outer-tab">
                            {test.files.map((file, idx) => (
                              <div className="file-tab">
                                <a
                                  href={`http://localhost:5000/tests/${file}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <Button
                                    sx={{
                                      fontWeight: "bolder",
                                    }} variant="contained">{`Attachment #${idx + 1
                                      }`}</Button>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="stu-ass-pro-bottom-container">
                <>
                  <div className="menu-icon">
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      aria-expanded={moreMenuOpen ? "true" : undefined}
                      onClick={moreMenuHandleClick}
                    >
                      <span class="material-icons" style={{ color: "#000" }}>
                        more_vert
                      </span>
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={moreMenuanchorEl}
                      open={moreMenuOpen}
                      onClose={moreMenuHandleClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      PaperProps={{
                        style: {
                          maxHeight: 48 * 4.5,
                          width: "fit-content",
                        },
                      }}
                    >
                      <MenuItem
                        key={"edit"}
                        onClick={() => {
                          setEditDialog(true);
                          setMoreMenuAnchorEl(null);
                        }}
                      >{"Edit Test Submission"}</MenuItem>
                      <MenuItem
                        key={"delete"}
                        onClick={() => {
                          setDeleteConfirmDialog(true);
                          setMoreMenuAnchorEl(null);
                        }}
                      >
                        {"Delete Test Submission"}
                      </MenuItem>
                    </Menu>
                  </div>
                  {submission ? (
                    <div className="stu-ass-details-container">
                      <div className="response-header">Your Response</div>
                      {submission.response && (
                        <div className="details-tab ">
                          Response:{" "}
                          <div className="details-bold ass-head-head ">
                            {submission.response}
                          </div>
                        </div>
                      )}
                      {submission.files && (
                        <div className="details-tab ">
                          <div className="files-outer-tab">
                            {submission.files.map((file, idx) => (
                              <div className="file-tab">
                                <a
                                  href={`http://localhost:5000/test_submissions/${file}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <Button
                                    sx={{
                                      fontWeight: "bolder",
                                    }} variant="contained">{`Attachment #${idx + 1
                                      }`}</Button>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="details-tab ">
                        Submission Date:{" "}
                        <div className="details-bold ass-head-head ">
                          {moment(submission.createdAt * 1000).format("llll")}
                        </div>
                      </div>
                      <div className="details-tab ">
                        Last Edit Date:{" "}
                        <div className="details-bold ass-head-head ">
                          {moment(submission.last_edit_date * 1000).format(
                            "llll"
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="no-class">
                      You have no submission yet.
                      <div className="submission-btn">
                        {
                          test && (
                            <Button
                              sx={{
                                fontWeight: "bolder",
                              }}
                              variant="contained"
                              disabled={Math.floor(Date.now() / 1000) > +test.due_date + 600}
                              onClick={() => {
                                setDialogOpen(true);
                              }}
                            >
                              Add Response
                            </Button>
                          )
                        }

                      </div>
                    </div>
                  )}
                </>
              </div>
            </div>
          </Box>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={snackbar}
          onClose={closeSnackBar}
          message={snackbarMessage}
          action={
            <React.Fragment>
              <SnackBarButton size="large" onClick={closeSnackBar}>
                Close
              </SnackBarButton>
            </React.Fragment>
          }
        />
        {test && submission && (
          <ConfirmDeleteTestSubmissionDialog
            open={deleteConfirmDialog}
            onClose={onDeleteConfirmDialogClose}
            openSnackBar={openSnackBar}
            title={test.title}
            id={submission.uid}
            fallbackURL={`${curr_url}/tests`}
          />
        )}
        {
          test && submission &&
          <UpdateTestSubmissionDialog
            open={editDialog}
            onClose={onEditDialogClose}
            openSnackBar={openSnackBar}
            test={test}
            submission={submission}
            submission_id={submission.uid}
          />
        }
        {test && (
          <NewTestSubmissionDialog
            open={dialogOpen}
            onClose={onDialogClose}
            openSnackBar={openSnackBar}
            uid={test.uid}
          />
        )}
      </LoadingOverlay>
    </>
  );
}

export default TestProfile;
