import React , {useState,useEffect} from 'react'
import "./studentnew.css"
import Container from '@mui/material/Container';
import FileSaver from 'file-saver';
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
import { sidebar_admin } from "../../../environments/sidebar_admin";
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Link, useRouteMatch } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import Paper from "@mui/material/Paper";
import { environment } from '../../../environments/environment';

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
  environment.apiUrl + "static/sampleStudent.csv",
  "csv-file-format.csv"
);
}

const[profileValue,setProfileValue]=useState([
  {"Name":"Enrollment No:",
    "Value":""
  },
  {"Name":"Name:",
    "Value":""
  },
  {"Name":"Email ID:",
    "Value":""
  },
  {"Name":"Contact No:",
    "Value":""
  },
  {"Name":"Course:",
    "Value":""
  },
  {"Name":"YoP:",
    "Value":""
  },
  {"Name":"Section:",
    "Value":""
  },])
  return (
    <>
      <LoadingOverlay
        active={loading}
        spinner
        text="Loading ..."
      >
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          /* <AppBar position="fixed" open={open}>
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
  
              <CssBaseline />
 
              <Stack spacing={2} direction="row">
      
      <Button variant="outlined"  style={{backgroundColor:"white", fontWeight:"bold"}} onClick={saveFile} className="filebtn">Get CSV File format</Button>
      
    </Stack>
            
              </Box>
            </Toolbar>
          </AppBar> */
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
        <Box sx={{ bgcolor: 'white !important', height: '80vh',marginTop:"6rem",}} >
                 <div className="newflex">
                 <Button onClick={handleOpened}variant="contained" sx={{width:'10rem', height:'5rem',fontSize:'1.3rem',fontWeight:'bold'}}>New ➕</Button>
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
            <Box sx={{ bgcolor: 'white ', height: '55vh' }} >
            <table className="tables" style={{padding:'2rem'}}>
               
            {  profileValue.map((name)=>(
             /*  <div className="cont">
               <label htmlFor="">{name.Name}&nbsp;&nbsp;</label>
               <div className="sugar1"><p>{name.Value}</p></div>
               </div> */
               <tr className="conti">
               <td><label htmlFor="" >{name.Name}&nbsp;&nbsp;</label></td>
               <td><input type="text" placeholder={`${name.Name}....`} className="modalinput"/></td>
               </tr>
            )
               )}
              
               </table>
               <br/><br/>
               <Button variant="contained" color='success'  >Save</Button>
                    
            </Box>
          </Box>
        </Fade>
      </Modal>
                <br></br>
                 <p style={{fontSize:'1.6rem', fontWeight:"bold"}}>OR</p><br />
                 <Button variant="contained" sx={{width:'10rem', height:'5rem',fontSize:'1.3rem', fontWeight:'bold' }} /* onclick={{()=>{return <>
                    <input id="csvFileInput" type="file" accept=".csv"/>
                    </>
                }} */>Bulk Import</Button>
                   
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
