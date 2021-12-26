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
// import moment from "moment";
import {
  getAttendanceSheet,
  postAttendanceSheet,
  getClasses
} from "../../services/faculty";
import { Link, useRouteMatch } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import LoadingOverlay from "react-loading-overlay";
import Paper from "@mui/material/Paper";
import Menu from '@mui/material/Menu';
import Logout from '@mui/icons-material/Logout';
import FacultyAppBar from './FacultyAppBar';
import CSVAttendanceDialog from './CSVAttendanceDialog';

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

function Attendance() {
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

  const [classes, setClasses] = useState([]);
  const [allClasses, setAllClasses] = useState(null);
  console.log(allClasses);

  const [loading, setLoading] = useState(false);
  const [submitLoad, setSubmitLoad] = useState(false);

  const postAttendance = async (details) => {
    try {
      setLoading(true);
      setSubmitLoad(true);
      const { data } = await postAttendanceSheet(details);
      console.log(data);
      openSnackBar(data.message);
    } catch (error) {
      console.log(error);
      openSnackBar("Some error occured");
      setLoading(false);
      setSubmitLoad(false);
    }

    setLoading(false);
    setSubmitLoad(false);
  };

  const attendanceSheet = async () => {
    try {
      setLoading(true);
      const { data } = await getAttendanceSheet();
      const classes_data = await getClasses();
      console.log(classes_data);
      setAllClasses(classes_data.data.data.classes);
      setClasses(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      openSnackBar("Some error occured");
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    attendanceSheet();
  }, []);

  useEffect(() => { }, [classes]);

  const [check, setCheck] = useState(false);

  const handleStudentAllCheck = (e) => {
    const state = e.target.checked;
    alert(state);
    setCheck(state);
    setClasses((c) => {
      return c.map((cl, idx) => {
        if (idx !== selected_class_idx) {
          return cl;
        } else {
          return {
            ...cl,
            all_students: cl.all_students.map((student) => {
              return {
                ...student,
                is_present: state,
              };
            }),
          };
        }
      });
    });
  };

  const handleStudentIndCheck = (event, r_no) => {
    const state = event.target.checked;
    let idx = classes[selected_class_idx].all_students.findIndex(
      (student) => student.roll_no === r_no
    );
    let new_array = classes[selected_class_idx].all_students;
    new_array[idx] = { ...new_array[idx], is_present: state };

    setClasses((c) => {
      return c.map((cl, idx) => {
        if (idx !== selected_class_idx) {
          return cl;
        } else {
          return {
            class_id: cl.class_id,
            subject_name: cl.subject_name,
            section: cl.section,
            all_students: new_array,
          };
        }
      });
    });
    // classes[selected_class_idx].all_students = new_array;

    // classes[selected_class_idx].all_students = classes[
    //   selected_class_idx
    // ].all_students.map((student) => {
    //   if (student.roll_no === r_no) {
    //     return {
    //       ...student,
    //       is_present: state,
    //     };
    //   } else {
    //     return student;
    //   }
    // });
    // if (state) {
    //   // added to list
    //   classes[selected_class_idx].present_students.push(r_no);
    // } else {
    //   // removed from list
    //   classes[selected_class_idx].present_students = classes[
    //     selected_class_idx
    //   ].present_students.filter((student) => student.roll_no !== r_no);
    // }

    // setClasses(classes);
    console.log(classes[selected_class_idx]);
  };

  const [select_label, setSelectLabel] = useState("");
  const [selected_class, setSelectedClass] = useState("");
  const [selected_class_idx, setSelectedClassIdx] = useState(-1);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Test Message");

  const handleChange = (event) => {
    setSelectedClass(event.target.value.split(":")[0]);
    setSelectLabel(event.target.value);
    setSelectedClassIdx(event.target.value.split(":")[1]);
  };

  const openSnackBar = (msg) => {
    setSnackbarMessage(msg);
    setSnackbar(true);
  };

  const closeSnackBar = () => {
    setSnackbar(false);
  };


  const onCSVDialogClose = () => {
    setCSVDialog(false);
    // assignmentDetails();
  };

  const [CSVDialog, setCSVDialog] = useState(false);

  return (
    <>
      <LoadingOverlay
        active={loading}
        spinner
        text="Loading Attendance Sheet..."
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
                            value={c.class_id + ":" + idx}
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
                    {
                      allClasses && (
                        <Button
                          sx={{
                            maxWidth: "fit-content",
                            marginRight: "10px",
                            fontWeight: "bolder",
                          }}
                          variant="contained"
                          onClick={() => {
                            setCSVDialog(true);
                          }}
                          disabled={!allClasses.length}
                        >
                          <span
                            class="material-icons"
                            style={{
                              color: "#fff",
                              marginRight: "5px",
                            }}
                          >
                            cloud_download
                          </span>
                          CSV
                        </Button>
                      )
                    }
                    <Button
                      variant="contained"
                      onClick={() => {
                        postAttendance(classes[selected_class_idx]);
                      }}
                      height="auto"
                      sx={{
                        fontWeight: 'bolder'
                      }}
                    >
                      Update Attendance
                    </Button>
                  </StyledLoader>
                </div>
              </div>
              <div className="list-container">
                {classes.length > 0 ? (
                  selected_class ? (
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
                              <Checkbox
                                color="primary"
                                onChange={(e) => {
                                  handleStudentAllCheck(e);
                                }}
                                checked={check}
                              />
                              Student Roll No (click to select all students)
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: "bold !important",
                                fontSize: "1rem !important",
                              }}
                            >
                              Student Name
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {classes
                            .filter((c) => c.class_id === selected_class)[0]
                            .all_students.map((student) => (
                              <TableRow key={student.roll_no}>
                                <TableCell component="th" scope="row">
                                  <Checkbox
                                    color="primary"
                                    onChange={(e) => {
                                      handleStudentIndCheck(e, student.roll_no);
                                    }}
                                    checked={student.is_present}
                                  />
                                  {student.roll_no}
                                </TableCell>
                                <TableCell>{student.name}</TableCell>
                              </TableRow>
                            ))}
                          {/* <TableRow
                          key="somekey"
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <Checkbox color="primary" checked={false} />
                            GK
                          </TableCell>
                        </TableRow> */}
                          {/* {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))} */}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <div className="no-class">Select a class first</div>
                  )
                ) : (
                  <div className="no-class">No classes available today</div>
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
        {allClasses && allClasses.length && (
          <CSVAttendanceDialog
            open={CSVDialog}
            onClose={onCSVDialogClose}
            openSnackBar={openSnackBar}
            classes={allClasses}
          />
        )}
      </LoadingOverlay>
    </>
  );
}

export default Attendance;
