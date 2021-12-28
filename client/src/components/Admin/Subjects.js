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
import { admin_sidebar_data } from "../../environments/sidebar_data";
// import "./attendance.css";
// import './assignment.css';
import { getSubjectsWithDepartmentID, getDepartments } from "../../services/admin";
import { Link, useRouteMatch } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LoadingOverlay from "react-loading-overlay";
import Paper from "@mui/material/Paper";
// import NewSubjectDialog from "./NewSubjectDialog";
import AdminAppBar from './AdminAppBar';
import { GlobalVariables } from '../../environments/global_data';
import NewSubjectDialog from './NewSubjectDialog';

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

function Subject() {
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

  const [selected_semester, setSelectedSemester] = useState(0);

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
    if (e.target.value === 0) {
      setFilteredSubjects(allSubjects)
    } else {
      setFilteredSubjects(allSubjects.filter(sub => sub.sem === e.target.value));
    }
  }
  // const [selected_class, setSelectedClass] = useState("");
  // const [selected_class_idx, setSelectedClassIdx] = useState(-1);

  const handleDepartmentChange = (event) => {
    setFilteredSubjects(allSubjects.filter(subject => subject.dept === event.target.value));
    setSelectLabel(event.target.value);
    subjectsSheet(event.target.value);
  };

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Test Message");

  const [allSubjects, setAllSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const onDialogClose = () => {
    setDialogOpen(false);
    subjectsSheet();
  }

  const getDepartmentList = async () => {
    try {
      setLoading(true);
      const { data } = await getDepartments();
      setDepartments(data.data);
    } catch (error) {
      console.log(error);
      openSnackBar("Some error occured");
      setLoading(false);
    }
    setLoading(false);
  }

  const subjectsSheet = async (dept_id) => {
    try {
      setLoading(true);
      const { data } = await getSubjectsWithDepartmentID(dept_id);
      setAllSubjects(data.final_result.subjects_data);
      setFilteredSubjects(data.final_result.subjects_data);
      setSelectedSemester(0);
      console.log(data);
    } catch (error) {
      console.log(error);
      openSnackBar("Some error occured");
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDepartmentList();
    // subjectsSheet();
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
        text="Loading Subjects Sheet..."
      >
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AdminAppBar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
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
              {admin_sidebar_data.map((section, idx) => (
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
                  {departments.length > 0 && (
                    <FormControl
                      fullWidth
                    >
                      <InputLabel id="class_select_label">
                        Select Department
                      </InputLabel>
                      <Select
                        labelId="class_select_label"
                        id="class_select"
                        value={select_label}
                        label="Select Department"
                        onChange={handleDepartmentChange}
                        placeholder="Select Department"
                      >
                        {departments.map((dept) => (
                          <MenuItem
                            value={dept.code}
                          >{`${dept.name}`}</MenuItem>
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
                      sx={{
                        fontWeight: 'bolder'
                      }}
                    >
                      <span class="material-icons">add</span> New Subject
                    </Button>
                  </StyledLoader>
                </div>
              </div>
              <div className="options-container">
                <div className="selector">
                  <FormControl
                    fullWidth
                  >
                    <InputLabel id="class_select_label">
                      Select Semester
                    </InputLabel>
                    <Select
                      labelId="class_select_label"
                      id="class_select"
                      value={selected_semester}
                      label="Select Department"
                      onChange={handleSemesterChange}
                      disabled={loading}
                    >
                      <MenuItem
                        value={0}>
                        All
                      </MenuItem>
                      {GlobalVariables.semesters.map((sem) => (
                        <MenuItem
                          value={sem.value}
                        >{`${sem.key}`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

              </div>
              <div className="list-container">
                {
                  departments && select_label !== "" ?
                    filteredSubjects.length > 0 ? (
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
                                Name
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontWeight: "bold !important",
                                  fontSize: "1rem !important",
                                }}
                              >
                                Semester
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontWeight: "bold !important",
                                  fontSize: "1rem !important",
                                }}
                              >
                                Department
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredSubjects.map((subject) => (
                              <TableRow key={subject.uid}>
                                <TableCell component="th" scope="row">
                                  <Link
                                    to={`${curr_url}/subjects/${subject.uid}`}
                                  >
                                    <div
                                      className={"clickable-title multiline-head"}
                                    >
                                      {subject.name}
                                      <div className="small-data">
                                        {subject.sem}{`${GlobalVariables.getProperSuffix(subject.sem)} sem`}
                                      </div>
                                    </div>
                                  </Link>
                                </TableCell>
                                <TableCell>
                                  {subject.code}

                                </TableCell>
                                <TableCell>
                                  {GlobalVariables.subject_types[subject.type]}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <div className="no-class">No Subjects to show... </div>
                    ) : (
                      <div className="no-class">Select a department first... </div>
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
        <NewSubjectDialog
          open={dialogOpen}
          onClose={onDialogClose}
          openSnackBar={openSnackBar}
        />
      </LoadingOverlay>
    </>
  );
}

export default Subject;
