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
import { getAssignmentSheet } from "../../services/student";

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

function Assignment() {
  let { url, path } = useRouteMatch();
  const curr_url = "/" + url.split("/")[1];

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
  const [allAssignments, setAllAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [select_label, setSelectLabel] = useState("All");

  const [status_filter, setStatusFilter] = useState("All");
  const [subject_filter, setSubjectFIlter] = useState("All");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Test Message");

  const filterBasedOnStatus = (new_status) => {
    let new_filtered_assignments = [];
    if (subject_filter === "All") {
      new_filtered_assignments = allAssignments;
    } else {
      new_filtered_assignments = allAssignments.filter(
        (assignment) => assignment.class_id === subject_filter
      );
    }
    if (new_status === "All") {
      setFilteredAssignments(new_filtered_assignments);
    } else {
      setFilteredAssignments(
        new_filtered_assignments.filter(
          (assignment) => assignment.completion_status === new_status
        )
      );
    }
    setStatusFilter(new_status);
  };

  const isActive = (status) => {
    return status_filter === status ? "stu-tab-active" : "";
  };

  const assignmentSheet = async () => {
    try {
      setLoading(true);
      const { data } = await getAssignmentSheet();
      console.log(data);
      setAllAssignments(data.data);
      setFilteredAssignments(data.data);
      setClasses(data.classes);
    } catch (error) {
      console.log(error);
      openSnackBar("Some error occured");
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    assignmentSheet();
  }, []);

  const handleChange = (event) => {
    let new_filtered_assignments = [];
    if (status_filter === "All") {
      new_filtered_assignments = allAssignments;
    } else {
      new_filtered_assignments = allAssignments.filter(
        (assignment) => assignment.completion_status === status_filter
      );
    }
    if (event.target.value === "All") {
      setFilteredAssignments(new_filtered_assignments);
    } else {
      setFilteredAssignments(
        new_filtered_assignments.filter(
          (assignment) => assignment.class_id === event.target.value
        )
      );
    }
    setSubjectFIlter(event.target.value);
    // setFilteredAssignments(
    //   allAssignments.filter(
    //     (assignment) => assignment.class_id === event.target.value
    //   )
    // );
    console.log(filteredAssignments);
    setSelectLabel(event.target.value);
  };

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
        text="Loading Assignment Sheet..."
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
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <div className="student-ass-main-container">
              <div className="student-ass-top-container">
                <ul className="stu-nav-container">
                  <li
                    // className={"stu-tabs "}
                    className={`stu-tabs ${isActive("All")}`}
                    onClick={() => filterBasedOnStatus("All")}
                  >
                    All
                  </li>
                  <li
                    // className={"stu-tabs "}
                    className={`stu-tabs ${isActive("Pending")}`}
                    onClick={() => filterBasedOnStatus("Pending")}
                  >
                    Pending
                  </li>
                  <li
                    // className={"stu-tabs "}
                    className={`stu-tabs ${isActive("Completed")}`}
                    onClick={() => filterBasedOnStatus("Completed")}
                  >
                    Completed
                  </li>
                </ul>
                <div className="stu-first-container-button">
                  <FormControl fullWidth>
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
                      <MenuItem value={"All"}>All Classes</MenuItem>
                      {classes.map((c, idx) => (
                        <MenuItem
                          value={c.class_id}
                        >{`${c.subject_name} [${c.faculty_name}]`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="stu-ass-bottom-container">
                {filteredAssignments.length > 0 ? (
                  <TableContainer
                    sx={{
                      backgroundColor: "#fff !important",
                    }}
                    component={Paper}
                  >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: "bold !important",
                              fontSize: "1rem !important",
                            }}
                          >
                            Title
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: "bold !important",
                              fontSize: "1rem !important",
                            }}
                          >
                            Subject
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: "bold !important",
                              fontSize: "1rem !important",
                            }}
                          >
                            Faculty Name
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: "bold !important",
                              fontSize: "1rem !important",
                            }}
                          >
                            Status
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: "bold !important",
                              fontSize: "1rem !important",
                            }}
                          >
                            Due Date
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredAssignments.map((assignment) => (
                          <TableRow key={assignment.uid}>
                            <TableCell component="th" scope="row">
                              <Link
                                to={`${curr_url}/assignments/${assignment.uid}`}
                              >
                                <div className={"clickable-title"}>
                                  {assignment.title}
                                </div>
                              </Link>
                            </TableCell>
                            <TableCell>{assignment.subject}</TableCell>
                            <TableCell>{assignment.faculty_name}</TableCell>
                            <TableCell>
                              <div
                                className={`stu-cell-status ${assignment.status_class}`}
                              >
                                {`${assignment.completion_status}${assignment.time_status}`}
                              </div>
                            </TableCell>
                            <TableCell>
                              {assignment.due_date
                                ? moment(assignment.due_date * 1000).format(
                                    "llll"
                                  )
                                : "--NA--"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <div className="no-class">No Assignments to show... </div>
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

export default Assignment;
