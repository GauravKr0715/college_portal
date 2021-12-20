import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { faculty_sidebar_data } from "../../environments/sidebar_data";
import "./attendance.css";
import './assignment.css';
import moment from "moment";
import { getAssignmentSheet } from "../../services/faculty";
import { Link, useRouteMatch } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LoadingOverlay from "react-loading-overlay";
import Paper from "@mui/material/Paper";
import NewAssignmentDialog from "./NewAssignmentDialog";
import FacultyAppBar from './FacultyAppBar';

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
  const profileOpen = Boolean(anchorEl);

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

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
  const [submitLoad, setSubmitLoad] = useState(false);

  const [select_label, setSelectLabel] = useState("");
  // const [selected_class, setSelectedClass] = useState("");
  // const [selected_class_idx, setSelectedClassIdx] = useState(-1);

  const handleChange = (event) => {
    setFilteredAssignments(allAssignments.filter(assignment => assignment.class_id === event.target.value));
    console.log(filteredAssignments);
    setSelectLabel(event.target.value);
  };

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Test Message");

  const [allAssignments, setAllAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [classes, setClasses] = useState([]);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const onDialogClose = () => {
    setDialogOpen(false);
    assignmentSheet();
  }

  const activateLoading = () => {
    setLoading(true);
  }

  const deactivateLoading = () => {
    setLoading(false);
  }

  const assignmentSheet = async () => {
    try {
      setLoading(true);
      const { data } = await getAssignmentSheet();
      setAllAssignments(data.final_result.assignment_data);
      setFilteredAssignments(data.final_result.assignment_data);
      setClasses(data.final_result.faculty_data.classes);
      console.log(data);
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
          <FacultyAppBar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
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
            <div className="att-container">
              <div className="options-container">
                <div className="selector">
                  {classes.length > 0 && (
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
                        {classes.map((c, idx) => (
                          <MenuItem
                            value={c.class_id}
                          >{`${c.subject_name} [${c.section}]`}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </div>
                <div className="updator">
                  <StyledLoader
                    active={submitLoad}
                    classNamePrefix="MyLoader_"
                    spinner
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        setDialogOpen(true);
                      }}
                      height="auto"
                    >
                      <span class="material-icons">add</span> New Assignment
                    </Button>
                  </StyledLoader>
                </div>
              </div>
              <div className="list-container">
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
                            Section
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
                            Created At
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
                            <TableCell>{assignment.section}</TableCell>
                            <TableCell>{assignment.subject}</TableCell>
                            <TableCell>{moment(assignment.createdAt * 1000).format('llll')}</TableCell>
                            <TableCell>{assignment.due_date ? moment(assignment.due_date * 1000).format('llll') : '--NA--'}</TableCell>
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
        <NewAssignmentDialog
          open={dialogOpen}
          onClose={onDialogClose}
          activateLoading={activateLoading}
          deactivateLoading={deactivateLoading}
          openSnackBar={openSnackBar}
        />
      </LoadingOverlay>
    </>
  );
}

export default Assignment;
