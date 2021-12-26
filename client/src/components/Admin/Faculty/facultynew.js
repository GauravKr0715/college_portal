import React, { useState } from 'react'
import "./facultynew.css"
import Container from '@mui/material/Container';
import FileSaver from 'file-saver';
import TextField from '@mui/material/TextField';
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { sidebar_admin } from "../../../environments/sidebar_admin";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Link, useRouteMatch } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import { environment } from '../../../environments/environment';
import AdminAppBar from '../AdminAppBar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
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

function Studentnew() {

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
  const [loading, setLoading] = useState(false);
  const [submitLoad, setSubmitLoad] = useState(false);

  /* const postAttendance = async (details) => {
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

 */
  const saveFile = () => {
    FileSaver.saveAs(
      environment.apiUrl + "static/sampleFaculty.csv",
      "csv-file-format.csv"
    );
  }

  const [profileValue, setProfileValue] = useState([
    {
      "Name": "Unique Id:",
      "Value": ""
    },
    {
      "Name": "Name:",
      "Value": ""
    },
    {
      "Name": "Email ID:",
      "Value": ""
    },
    {
      "Name": "Contact No:",
      "Value": ""
    },
    {
      "Name": "Department:",
      "Value": ""
    },
    {
      "Name": "YoJ:",
      "Value": ""
    },
  ])


  return (
    <>
      <LoadingOverlay
        active={loading}
        spinner
        text="Loading ..."
      >
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AdminAppBar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} button={
            {
              title: 'Get CSV File format',
              path: 'sampleFaculty.csv'
            }
          } />
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
              {sidebar_admin.map((section, idx) => (
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
            <div className="start">
              <CssBaseline />
              <Container maxWidth="sm">
                <Box sx={{ bgcolor: 'white !important', height: '80vh', marginTop: "6rem", }} >
                  <div className="newflex">
                    <Button onClick={handleOpened} variant="contained" sx={{ width: '10rem', height: '5rem', fontSize: '1.3rem', fontWeight: 'bold' }}>New ➕</Button>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={opened}
                      onClose={handleClosed}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={opened}>
                        <Box sx={style}>
                          <Typography id="transition-modal-title" variant="h4" component="h3">
                            Fill the details
                          </Typography>
                          <Box sx={{ bgcolor: 'white ', height: '69vh' }} ><br />
                            <Box
                              component="form"
                              sx={{
                                '& > :not(style)': { m: 1, width: '25ch', marginLeft: '3.5rem' },
                              }}
                              noValidate
                              autoComplete="off"
                            >

                              {profileValue.map((name) => (


                                <TextField id="standard-basic" label={name.Name} variant="outlined" color='action' margin='normal' sx={{ width: '12rem' }} />

                              )
                              )}
                            </Box>


                            <br />
                            <Button variant="contained" color='primary' sx={{ marginLeft: '7rem' }} >Save</Button>

                          </Box>
                        </Box>
                      </Fade>
                    </Modal>
                    <br></br>
                    <p style={{ fontSize: '1.6rem', fontWeight: "bold" }}>OR</p><br />
                    <Button variant="contained" sx={{ width: '10rem', height: '5rem', fontSize: '1.3rem', fontWeight: 'bold' }}  >Bulk Import</Button>

                  </div>
                </Box>
              </Container>
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

export default Studentnew
