import React , {useState,useEffect} from 'react'
import ClassModal from'./ClassModal';
import Modal from '@material-ui/core/Modal';
import "./SectionCreate.css"
import Dynamic from './Dynamic';
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

import { admin_sidebar_data } from "../../../environments/sidebar_data";
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
   const [opens, setOpens] = React.useState(false);
   const [selectedSlot,setSelectedSlot]=useState(null);
   const handleClose = () => {
     setOpens(false);
   };

   const handleOpen = () => {
     setOpens(true);
   };

   const [time_table, setTimeTable] = useState([
      [
        { "slot_id": "D1S1", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D1S2", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D1S3", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D1S4", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D1S5", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D1S6", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      ], [
        { "slot_id": "D2S1", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D2S2", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D2S3", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D2S4", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D2S5", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D2S6", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      ], [
        { "slot_id": "D3S1", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D3S2", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D3S3", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D3S4", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D3S5", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D3S6", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      ], [
        { "slot_id": "D4S1", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D4S2", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D4S3", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D4S4", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D4S5", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D4S6", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      ], [
        { "slot_id": "D5S1", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D5S2", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D5S3", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D5S4", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D5S5", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D5S6", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      ], [
        { "slot_id": "D6S1", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D6S2", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D6S3", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D6S4", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D6S5", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
        { "slot_id": "D6S6", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": 0, "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      ]
    ]);

    const [options, setOptions] = useState([
       "class1",
       "class2",
       "class3"
   ]);


    const[today,setDays]=useState(["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"])

    const [Tnames,setTnames]=useState([
   [{
      Subject:"ADBA",
      Faculty:"Mr.Mohit Dayal",
      Type:"Lecture"
}],[{
      Subject:"WC",
      Faculty:"Dr.Meenakshi",
      Type:"Lecture"
}],[{
      Subject:"ACN",
      Faculty:"Mr.Ujjwal Jain",
      Type:"Lab"
}],

   [{
      Subject:"ACN",
      Faculty:"Mr.Ujjwal Jain",
      Type:"Lab"
}],[{
      Subject:"CNS",
      Faculty:"Ms.Kajal Kaul",
      Type:"Lecture"
}],[{
      Subject:"No Lecture",
      Faculty:" ",
      Type:" "
}]
])

const getClassString = (slot) => {
   return (
      <div>
         <p>{slot.subject_name}</p><br/>
         <p>{slot.subject_type}</p><br/>
         <p>{slot.faculty_name}</p>
      </div>
   )
}
    let { url, path } = useRouteMatch();
  const curr_url = "/" + url.split("/")[1];
  const [loading, setLoading] = useState(false);
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
  const [selectedStudents, setSelectedStudents] = useState([]);
    useEffect(() => {

    }, [selectedStudents]);

    const [students, setStudents] = useState([
        {
            id: 101,
            name: 'Akshaya',
            isSelected: false
        },
        {
            id: 102,
            name: 'Gaurav',
            isSelected: false
        },
        {
            id: 103,
            name: 'Akshay',
            isSelected: false
        },
        {
            id: 104,
            name: 'Pooja',
            isSelected: false
        },
    ]);
    const checkIfStudentExists = (given_id) => {
        return selectedStudents.some(s => s.id == given_id);
    }
    const[Name,setName]=useState("false")
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


        <div className="dyns">
        <table className="table">
          <thead>
            <tr>
            <th>Days/Time</th>
            <th><h4>09:10-10:05</h4></th>
            <th><h4>10:05-11:00</h4></th>
            <th style={{backgroundColor:"rgb(161, 161, 161)"}}><h4></h4></th>
            <th><h4>11:30-12:25</h4></th>
            <th><h4>12:25-01:20</h4></th>
            <th><h4>01:20-02:15</h4></th>
            <th><h4>02:15-03:10</h4></th>
         </tr>
         </thead>

          <tbody>
          {
               time_table.map((day, idx) => (
                  <tr>
                  <td><h4 >{today[idx]}</h4></td>
                  {
                     day.map((slot, idx) => (
                        <td onClick={() => {
                           setSelectedSlot(slot.slot_id)
                           handleOpen()
                           // openEditModal(slot)
                        }}>
                         <h5>Add ➕</h5>
                        </td>

                     ))
                  }
                  </tr>
               ))
            }
</tbody>



        </table>
        <div className="ta">
        <div className="btn-1"><Link to="/admin/SectionCreate" style={{textDecoration:"none",color:"beige"}} >Back</Link></div>
        <div className="btn-2"><Link to="/admin/SectionFinal" style={{textDecoration:"none",color:"beige"}} >Next</Link></div>
        </div>

     </div>


   <ClassModal open={opens}
   onClose={() => handleClose()}/>
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



