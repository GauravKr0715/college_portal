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
import Checkbox from "@mui/material/Checkbox";
import LoadingOverlay from "react-loading-overlay";
import Paper from "@mui/material/Paper";
import NewAssignmentDialog from "./NewAssignmentDialog";
import Menu from '@mui/material/Menu';
import Logout from '@mui/icons-material/Logout';
import FacultyAppBar from './FacultyAppBar';
import { fontWeight } from "@mui/system";

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
    
  }

  const activateLoading = () => {
    setLoading(true);
  }

  const deactivateLoading = () => {
    setLoading(false);
  }

  
  const openSnackBar = (msg) => {
    setSnackbarMessage(msg);
    setSnackbar(true);
  };

  const closeSnackBar = () => {
    setSnackbar(false);
  };

  function createData(one, two, three, four, five, six, seven, eight) {
    return { one, two, three, four, five, six, seven, eight };
  }
  
  const rows = [
    createData('Monday', "ADBA", "ACN", "", "ST", "CNS", "GROUP B CNS", "GROUP A ST"),
    createData('Tuesday', "", "", "", "", "", "", ""),
    createData('Wednesday', "", "", "", "", "", "", ""),
    createData('Thursday', "", "", "", "", "", "", ""),
    createData('Friday', "", "", "", "", "", "", ""),
    createData('Saturday', "", "", "", "", "", "", ""),
  
  ];

  return (
    <>
      <LoadingOverlay
        active={loading}
        spinner
        text="Loading Time Table..."
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
          <Table >
          <TableHead>
            <TableRow>
            <TableCell>   </TableCell>
            <TableCell sx={{ fontWeight:'bold'}} >09:10-10:05</TableCell>
            <TableCell sx={{ fontWeight:'bold'}} >10:05-11:00</TableCell>
            <TableCell sx={{ fontWeight:'bold'}}>Lunch-Time</TableCell>
            <TableCell sx={{ fontWeight:'bold'}}>11:30-12:25</TableCell>
            <TableCell sx={{ fontWeight:'bold'}}>12:25-01:20</TableCell>
            <TableCell sx={{ fontWeight:'bold'}}>01:20-02:15</TableCell>
            <TableCell sx={{ fontWeight:'bold'}}>02:15-03:10</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map(row =>( 
              <TableRow >
              <TableCell component="th" scope="row" sx={{ fontWeight:'bold' }}>
              {row.one}
            </TableCell>

            <TableCell >{row.two}</TableCell>
            <TableCell  >{row.three}</TableCell>
            <TableCell >{row.four}</TableCell>
            <TableCell  >{row.five}</TableCell>
            <TableCell >{row.six}</TableCell>
            <TableCell >{row.seven}</TableCell>
            <TableCell >{row.eight}</TableCell>
                               </TableRow>
            ))
          }
          </TableBody>
        </Table>
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
