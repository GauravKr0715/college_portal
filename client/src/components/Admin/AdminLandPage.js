import React , {useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import "./AdminLandPage.css"


import logo from "../../assets/image/logo.jpg";
import Container from '@mui/material/Container';

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

import { sidebar_admin } from "../../environments/sidebar_admin";




import { Link, useRouteMatch } from "react-router-dom";

import LoadingOverlay from "react-loading-overlay";
import Paper from "@mui/material/Paper";

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
          <div>
          <Link to="/admin/AdminLandPage">  <img src={logo} alt="" className="img" style={{marginTop:'3rem'}}/></Link>
           
            </div>
          
      
          <div className="sec" style={{marginTop:'10rem !important'}}>
          <p>Admin</p>
          
          </div>
        
    
          <div className="container_">
            <div className="one">
              <Link to="/admin/SubjectPage" style={{textDecoration:"none",color:"beige"}}>
    
                <button class="button_" type="submit">
    
                  Subjects
                </button>
              </Link>
    
    
            </div>
            <div className="two">
              <Link to="/admin/studentnew" style={{textDecoration:"none",color:"beige"}}>
                <button class="button_" type="submit">
                  Student
                </button>
              </Link>
    
            </div>
            <div className="three">
              <Link to="/admin/facultynew" style={{textDecoration:"none",color:"beige"}}>
                <button class="button_" type="submit">
                  Faculty
                </button>
              </Link>
    
            </div>
    
            <div className="four">
              <Link to="/admin/SectionCreate" style={{textDecoration:"none",color:"beige"}}>
                <button class="button_" type="submit">
                  Section
                </button>
              </Link>
    
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
      </LoadingOverlay>
    </>
  );
}

export default Studentnew




/* import React from 'react'
import { Link } from 'react-router-dom';
import Sideview from '../sideview'
import Dynamics from '../Subject/Dynamics';
import "../Section/SectionCreate.css"

function Subject() {
   
    return (
        <div>
            <Sideview/> 

            <div className="sec">
            <p>Subjects Creation</p>
            
            </div>

            <div className="options">

            
            <div className="twoss">
                <label htmlFor="semester">Semester:  </label>
                <select>  
                   <option value = "Ist sem"> Ist Semester
                     </option>  
                   <option value = "IInd sem"> IInd Semester   
                     </option>  
                   <option value = "IIIrd sem"> IIIrd Semester
                     </option>  
                   <option value = "IVth sem"> IVth Semester                         </option>  
                     <option value = "IVth sem"> Vth Semester 
                     </option>  
                     <option value = "IVth sem"> VIth Semester
                     </option>  
                     <option value = "IVth sem"> VIIth Semester
                     </option>  
                     <option value = "IVth sem"> VIIIth Semester  
                     </option>  
                </select>  
            </div>



            <div className="fourss">
            <label htmlFor="Department">Department: </label>
            <select>  
                   <option value = "CSE"> CSE
                     </option>  
                   <option value = "IT">  IT
                     </option>  
                   <option value = "ECE"> ECE
                     </option>  
                   <option value = "EEE"> EEE  
                     </option>  
                     <option value = "MECH"> MECH 
                     </option>
                     <option value = "CIVIL"> CIVIL
                     </option>
                     <option value = "BBA"> BBA 
                     </option>
                     <option value = "MBA"> MBA  
                     </option>
                </select>
            </div>
            </div>

            <div className="dyn">
              
                <Dynamics/>
                        
            </div>

            <div ><button className="nextone">Save</button></div>

        </div>
    )
}

export default Subject
 */


