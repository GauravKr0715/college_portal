import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { faculty_sidebar_data } from "../../environments/sidebar_data";
import "./attendance.css";
// import moment from "moment";
import { getAttendanceReport } from "../../services/student";
import { Link, useRouteMatch } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import Paper from "@mui/material/Paper";
import { PieChart } from "react-minimal-pie-chart";

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

  const [report, setReport] = useState([
    {
      class_id: "F903",
      subject_name: "IT Subject 7_4",
      faculty_name: "Faculty 4",
      total_classes: 0,
      classes_taken: 0,
      percentage: 0,
    },
    {
      class_id: "F902",
      subject_name: "IT Subject 7_2",
      faculty_name: "Faculty 1",
      total_classes: 2,
      classes_taken: 1,
      percentage: 50,
    },
    {
      class_id: "F901",
      subject_name: "CS Subject 7_1",
      faculty_name: "Faculty 6",
      total_classes: 3,
      classes_taken: 2,
      percentage: 66.66666666666666,
    },
  ]);

  const [loading, setLoading] = useState(false);

  const attendanceReport = async () => {
    try {
      setLoading(true);
      const { data } = await getAttendanceReport();
      setReport(data.data);
      if (data.data.length > 0) {
        setSelectLabel(`${data.data[0].subject_name} [${data.data[0].faculty_name}]`);
        setSelectedClass(data.data[0]);
        setPiechartData([
          { title: "Attended", value: data.data[0].classes_taken, color: "#16ce2f" },
          {
            title: "Absent",
            value: data.data[0].total_classes - data.data[0].classes_taken,
            color: "#ec3a3a",
          },
        ]);
      }
      console.log(data.data);
    } catch (error) {
      console.log(error);
      openSnackBar("Some error occured");
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    attendanceReport();
  }, []);

  const [select_label, setSelectLabel] = useState("");
  const [selected_class, setSelectedClass] = useState("");
  const [selected_class_idx, setSelectedClassIdx] = useState(-1);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Test Message");
  const [piechartData, setPiechartData] = useState([]);

  const handleChange = (event) => {
    // setSelectedClass(event.target.value.split(":")[0]);
    setSelectLabel(event.target.value);
    let cla = report.filter((c) => c.class_id === event.target.value)[0];
    setSelectedClass(cla);
    setPiechartData([
      { title: "Attended", value: cla.classes_taken, color: "#16ce2f" },
      {
        title: "Absent",
        value: cla.total_classes - cla.classes_taken,
        color: "#ec3a3a",
      },
    ]);
    // setSelectedClassIdx(event.target.value.split(":")[1]);
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
        text="Loading Attendance Report..."
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
              {/* <Typography variant="h6" noWrap component="div">
              Mini variant drawer
            </Typography> */}
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
            <div className="att-container">
              <div className="student-options-container">
                {report.length > 0 && (
                  <FormControl style={{ minWidth: "30%" }}>
                    <InputLabel id="class_select_label">
                      Select Class
                    </InputLabel>
                    <Select
                      labelId="class_select_label"
                      id="class_select"
                      value={select_label}
                      label="Select Class"
                      onChange={handleChange}
                      style={{ minWidth: "50%" }}
                    >
                      {report.map((rep) => (
                        <MenuItem
                          value={rep.class_id}
                        >{`${rep.subject_name} [${rep.faculty_name}]`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                {/* {classes.length > 0 && (
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
                )} */}
              </div>
              {selected_class && (
                <div className="report-container">
                  <div className="report-text">
                    <div className="text-container">
                      <div className="normal">Subject Name: </div>
                      <div className="header">
                        {selected_class.subject_name}
                      </div>
                    </div>
                    <div className="text-container">
                      <div className="normal">Faculty Name: </div>
                      <div className="header">
                        {selected_class.faculty_name}
                      </div>
                    </div>
                    <div className="text-container">
                      <div className="normal">Classes Attended: </div>
                      <div className="header">
                        {selected_class.classes_taken}
                      </div>
                    </div>
                    <div className="text-container">
                      <div className="normal">Total Classes Conducted: </div>
                      <div className="header">
                        {selected_class.total_classes}
                      </div>
                    </div>
                    <div className="text-container">
                      <div className="normal">Percentage: </div>
                      <div className="header">
                        {selected_class.percentage.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  <div className="report-graph">
                    <div className="text-container">
                      <b>Attended:</b>
                      <div className="color-box present"></div>
                    </div>
                    <div className="text-container">
                      <b>Absent:</b>
                      <div className="color-box absent"></div>
                    </div>
                    {selected_class.total_classes > 0 ? (
                      selected_class.percentage > 0 ? (
                        <div className="chart">
                          <PieChart
                            label={({ dataEntry }) => `${dataEntry.title}`}
                            data={piechartData}
                          />
                        </div>
                      ) : (
                        <div className="chart">
                          <PieChart data={piechartData} />
                        </div>
                      )
                    ) : (
                      <div className="no-text-container">
                        {" "}
                        <div className="header">
                          Insufficient data for visual representation
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
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

export default Attendance;
