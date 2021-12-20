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
import { getNotesDetails } from "../../services/faculty";
import Menu from "@mui/material/Menu";
import ConfirmDeleteNotesDialog from "./ConfirmDeleteNotesDialog";
import UpdateNotesDialog from './UpdateNotesDialog';
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

function NotesProfile(props) {
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

  const [status_filter, setStatusFilter] = useState("All");

  const [notes, setNotes] = useState(null);

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Test Message");

  const [dialogOpen, setDialogOpen] = React.useState(false);
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
    notesDetails();
  };

  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState(false);

  const onEditDialogClose = () => {
    setEditDialog(false);
    notesDetails();
  };

  const [editDialog, setEditDialog] = useState(false);

  const onDialogClose = () => {
    setDialogOpen(false);
    notesDetails();
  };

  const notesDetails = async () => {
    try {
      setLoading(true);
      const { data } = await getNotesDetails(id);
      setNotes(data.notes_data);
      // setResult(data.result_obj);
      console.log(data);
    } catch (error) {
      console.log(error);
      openSnackBar("Some error occured");
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    notesDetails();
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
        text="Loading Notes Details..."
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
          <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}>
            <DrawerHeader />
            <div className="student-ass-profile-main-container">
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
                        width: "20ch",
                      },
                    }}
                  >
                    <MenuItem key={"edit"}
                      onClick={() => {
                        setEditDialog(true);
                        setMoreMenuAnchorEl(null);
                      }}>
                      {"Edit Notes"}</MenuItem>
                    <MenuItem
                      key={"delete"}
                      onClick={() => {
                        setDeleteConfirmDialog(true);
                        setMoreMenuAnchorEl(null);
                      }}
                    >
                      {"Delete Notes"}
                    </MenuItem>
                  </Menu>
                </div>
                {notes && (
                  <div className="student-pro-ass-top-container">
                    <div className="stu-top-left-container">
                      <div className="stu-ass-details-container">
                        <div className="details-tab">
                          <div className="details-bold ass-head-head mega-head">
                            {notes.title}
                          </div>
                        </div>
                        {notes.description && (
                          <div className="details-tab ">
                            Description:{" "}
                            <div className="details-bold ass-head-head ">
                              {notes.description}
                            </div>
                          </div>
                        )}
                        <div className="details-tab ">
                          {notes.subject}
                          {" • "}
                          {notes.section}
                        </div>
                        <div className="details-tab ">
                          Created At:{" "}
                          <div className="details-bold ass-head-head ">
                            {moment(notes.createdAt * 1000).format("llll")}
                          </div>
                        </div>
                        {notes.files && (
                          <div className="details-tab ">
                            <div className="files-outer-tab">
                              {notes.files.map((file, idx) => (
                                <div className="file-tab">
                                  <a
                                    href={`http://localhost:5000/notes/${file}`}
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
              </>
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
        {notes && (
          <ConfirmDeleteNotesDialog
            open={deleteConfirmDialog}
            onClose={onDeleteConfirmDialogClose}
            openSnackBar={openSnackBar}
            title={notes.title}
            id={notes.uid}
            fallbackURL={`${curr_url}/notes`}
          />
        )}
        {
          notes &&
          <UpdateNotesDialog
            open={editDialog}
            onClose={onEditDialogClose}
            openSnackBar={openSnackBar}
            notes={notes}
            notes_id={notes.uid}
          />
        }
      </LoadingOverlay>
    </>
  );
}

export default NotesProfile;
