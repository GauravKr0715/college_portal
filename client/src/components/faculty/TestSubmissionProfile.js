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
import "../Students/student-assignment.css";
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
import { getTestSubmissionDetails } from "../../services/faculty";

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
  console.log(url);
  const curr_url = "/" + url.split("/")[1];
  const test_id = url.split("/")[3];
  const submission_id = url.split("/")[4];

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

  const [test, setTest] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [result, setResult] = useState(null);

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Test Message");

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const onDialogClose = () => {
    setDialogOpen(false);
    // testDetails();
  };

  const testSubmissionDetails = async () => {
    try {
      setLoading(true);
      const { data } = await getTestSubmissionDetails(test_id, submission_id);
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
    testSubmissionDetails();
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
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }}></Box>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
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
                        {" • "}
                        {test.faculty_name}
                      </div>
                      {result && (
                        <div className="details-tab ">
                          Status:{" "}
                          <div className="details-bold ass-head-head ">
                            <div
                              className={`stu-pro-cell-status ${result.status_class}`}
                            >
                              {`${result.time_status}`}
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
                      {test.due_date && (
                        <div className="details-tab ">
                          Due By:{" "}
                          <div className="details-bold ass-head-head ">
                            {moment(test.due_date * 1000).format("llll")}
                          </div>
                        </div>
                      )}
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
                                  <Button variant="contained">{`Attachment #${idx + 1
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
                {submission ? (
                  <div className="stu-ass-details-container">
                    <div className="response-header">Submitted Response</div>
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
                                <Button variant="contained">{`Attachment #${idx + 1
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
                    No submission yet...
                  </div>
                )}
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
      </LoadingOverlay>
    </>
  );
}

export default TestProfile;
