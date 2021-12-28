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
import AdminAppBar from "./AdminAppBar";
import { GlobalVariables } from "../../environments/global_data";
import { getSectionData } from "../../services/admin";
import "./section_profile.css";
import ClassesDialog from "./ClassesDialog";

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

function SectionProfile() {
  let { url, path } = useRouteMatch();
  const curr_url = "/" + url.split("/")[1];
  const id = url.split("/")[3];

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
  const [section_details, setSectionDetails] = useState(null);

  const [pages, setPages] = useState([
    {
      idx: 1,
      active: true,
    },
    {
      idx: 2,
      active: false,
    },
    {
      idx: 3,
      active: false,
    },
  ]);
  const [activePage, setActivePage] = useState(1);

  const goLeft = () => {
    if (activePage !== 1) {
      setActivePage(activePage - 1);
    }
  };

  const goRight = () => {
    if (activePage !== 3) {
      setActivePage(activePage + 1);
    }
  };

  const [classesDialogOpen, setClassesDialogOpen] = useState(false);

  const openClassesDialog = () => {
    setClassesDialogOpen(true);
  };

  const onClassesDialogClose = () => {
    setClassesDialogOpen(false);
    sectionDetails();
  };

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Test Message");

  const sectionDetails = async () => {
    try {
      const data = await getSectionData(id);
      setSectionDetails(data.data.data);
      console.log(data.data.data);
    } catch (error) {
      console.log(error);
      openSnackBar("Some error occured");
      setLoading(false);
    }
  };

  useEffect(() => {
    sectionDetails();
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
      <LoadingOverlay active={loading} spinner text="Loading Sections...">
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AdminAppBar
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
            <div className="att-container">
              <div className="options-container back-grey">
                <div className="section-selector">
                  {section_details && (
                    <div className="section-details">
                      <div className="section-details-elem">
                        Section:{" "}
                        <div className="section-details-bold">
                          {section_details.name}
                        </div>
                      </div>
                      <div className="section-details-elem">
                        Year:{" "}
                        <div className="section-details-bold">
                          {section_details.year}
                          {GlobalVariables.getProperSuffix(
                            parseInt(section_details.year)
                          )}
                        </div>
                      </div>
                      <div className="section-details-elem">
                        Department:{" "}
                        <div className="section-details-bold">
                          {section_details.dept_name}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="list-container">
                {activePage === 1 && (
                  <>
                    <div className="page-head">Section Classes</div>
                    <div className="page-content">
                      {section_details && section_details.classes.length ? (
                        <TableContainer
                          sx={{
                            backgroundColor: "#fff !important",
                          }}
                          component={Paper}
                        >
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
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
                                  Faculty
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontWeight: "bold !important",
                                    fontSize: "1rem !important",
                                  }}
                                >
                                  Subject Type
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {section_details.classes.map((c) => (
                                <TableRow key={c.uid}>
                                  <TableCell component="th" scope="row">
                                    {c.subject_name}
                                  </TableCell>
                                  <TableCell>{c.faculty_name}</TableCell>
                                  <TableCell>
                                    {
                                      GlobalVariables.subject_types[
                                        c.subject_type
                                      ]
                                    }
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : null}
                      <TableRow key={"0715"}>
                        <TableCell component="th" scope="row">
                          <Button
                            variant="contained"
                            height="auto"
                            sx={{
                              fontWeight: "bolder",
                            }}
                            onClick={openClassesDialog}
                          >
                            <span
                              class="material-icons"
                              style={{
                                marginRight: "5px",
                              }}
                            >
                              add
                            </span>
                            New Class(es)
                          </Button>
                        </TableCell>
                      </TableRow>
                    </div>
                  </>
                )}
                {/* {
                  activePage === 2 && ()
                }
                {
                  activePage === 3 && ()
                } */}
              </div>
              <div className="navigator">
                <div className="left-nav">
                  <Button
                    variant="contained"
                    height="auto"
                    sx={{
                      fontWeight: "bolder",
                    }}
                    disabled={activePage === 1}
                    onClick={goLeft}
                  >
                    <span class="material-icons">chevron_left</span>
                    Previous
                  </Button>
                </div>
                <div className="pagination">{`Page ${activePage} / ${pages.length}`}</div>
                <div className="right-nav">
                  <Button
                    variant="contained"
                    height="auto"
                    sx={{
                      fontWeight: "bolder",
                    }}
                  >
                    Save
                    <span
                      class="material-icons"
                      style={{
                        marginLeft: "5px",
                      }}
                    >
                      check_circle
                    </span>
                  </Button>
                  <Button
                    variant="contained"
                    height="auto"
                    sx={{
                      fontWeight: "bolder",
                    }}
                    disabled={activePage === 3}
                    onClick={goRight}
                  >
                    Next
                    <span class="material-icons">chevron_right</span>
                  </Button>
                </div>
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
        {section_details && (
          <ClassesDialog
            open={classesDialogOpen}
            onClose={onClassesDialogClose}
            openSnackBar={openSnackBar}
            section_id={id}
          />
        )}
      </LoadingOverlay>
    </>
  );
}

export default SectionProfile;
