import React, { useState, useEffect } from "react";
import "./studentnew.css";
import Container from "@mui/material/Container";
import FileSaver from "file-saver";
import TextField from "@mui/material/TextField";
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
import { admin_sidebar_data } from "../../environments/sidebar_data";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Link, useRouteMatch } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import Paper from "@mui/material/Paper";
import { environment } from "../../environments/environment";
import AdminAppBar from "./AdminAppBar";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { searchFacultyByID } from "../../services/admin";
import NewFacultyDialog from "./NewFacultyDialog";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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

function Faculty() {
  const [opened, setOpened] = React.useState(false);
  const handleOpened = () => setOpened(true);
  const handleClosed = () => setOpened(false);

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

  const [select_label, setSelectLabel] = useState("");
  const [selected_class, setSelectedClass] = useState("");
  const [selected_class_idx, setSelectedClassIdx] = useState(-1);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Test Message");

  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [faculty_details, setFacultyDetails] = useState(null);
  const [faculty_details_error, setFacultyDetailsError] = useState(null);

  const searchFaculty = async () => {
    setError(null);
    setFacultyDetailsError(null);
    try {
      setLoading(true);
      if (query === null || query === "") {
        setError(true);
      } else {
        const { data } = await searchFacultyByID(query);
        if (data.success) {
          setFacultyDetails(data.faculty_data);
          setFacultyDetailsError(null);
          setQuery("");
        } else {
          setFacultyDetailsError(data.message);
          setFacultyDetails(null);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

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
  const [submitLoad, setSubmitLoad] = useState(false);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const onDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {/* <LoadingOverlay active={loading} spinner text="Loading ..."> */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AdminAppBar
          button={{
            path: "sampleFaculty.csv",
            title: "Get CSV File format",
          }}
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: "50px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <>
                  <div className="search-container">
                    <div className="search-field">
                      <TextField
                        sx={{
                          margin: "15px",
                        }}
                        error={error}
                        id="code"
                        label="Faculty ID"
                        value={query}
                        errorText="Faculty ID cannot be empty"
                        onChange={(e) => {
                          setQuery(e.target.value);
                        }}
                        variant="outlined"
                      />
                    </div>
                    <div className="search-btn">
                      <Button
                        onClick={searchFaculty}
                        variant="contained"
                        sx={{ fontWeight: "bolder" }}
                        disabled={loading}
                      >
                        <span
                          style={{
                            marginRight: "2px",
                          }}
                          class="material-icons"
                        >
                          search
                        </span>
                        Search
                      </Button>
                    </div>
                  </div>
                  {faculty_details && (
                    <TableRow key={query}>
                      <TableCell component="th" scope="row">
                        <div className={"clickable-title multiline-head"}>
                          {faculty_details.full_name}
                          <div className="small-data">
                            {faculty_details.uni_id}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <div className={"clickable-title multiline-head"}>
                          {faculty_details.email}
                          <div className="small-data">
                            Email ID
                          </div>
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <div className={"clickable-title multiline-head"}>
                          {faculty_details.mobile ? faculty_details.mobile : 'N/A'}
                          <div className="small-data">
                            Mobile Number
                          </div>
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <div className={"clickable-title multiline-head"}>
                          {faculty_details.dept_name}
                          <div className="small-data">
                            Department
                          </div>
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <div className={"clickable-title multiline-head"}>
                          {faculty_details.yoj}
                          <div className="small-data">
                            Year of Joining
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  {faculty_details_error && (
                    <div className="no-class">{faculty_details_error}</div>
                  )}
                </>
              </Box>
            </Box>
            <Divider
              variant="middle"
              sx={{
                width: "100%",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: "50px",
              }}
            >
              <div className="newflex">
                <Button
                  onClick={() => {
                    setDialogOpen(true);
                  }}
                  variant="contained"
                  sx={{ fontWeight: "bolder" }}
                >
                  <span class="material-icons">add</span>
                  New
                </Button>
                <br></br>
                {/* <p style={{ fontSize: "1.6rem", fontWeight: "bold" }}>OR</p>
                <br />
                <Button
                  variant="contained"
                  sx={{
                    fontWeight: "bolder",
                  }}
                >
                  Bulk Import
                </Button> */}
              </div>
            </Box>
          </Box>
          <div className="start">
            <CssBaseline />
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
      <NewFacultyDialog
        open={dialogOpen}
        onClose={onDialogClose}
        openSnackBar={openSnackBar}
      />
      {/* </LoadingOverlay> */}
    </>
  );
}

export default Faculty;
