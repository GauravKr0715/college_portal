import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Container from '@mui/material/Container';
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
import './assignment.css';
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import { getAssignmentSheet } from "../../services/faculty";
import { Link, useRouteMatch } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LoadingOverlay from "react-loading-overlay";
import Paper from "@mui/material/Paper";
import NewAssignmentDialog from "./NewAssignmentDialog";
import FacultyAppBar from './FacultyAppBar';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

function Assignment() {

    const[links, setLinks]=useState([{
      title:'',
      link:''
    }
    ])

    const handleInput1 = event => {
    setLinks([{title:event.target.value}]);
  };
  const handleInput2 = event => {
    setLinks([{link:event.target.value}]);
  };
  


  const [openss, setOpenss] = React.useState(false);
  const handleOpenss = () => setOpenss(true);
  const handleClosess = () => setOpenss(false);



  const saveAssignment = async () => {
    try {
      if (document.getElementById("attachments").files.length) {
        var formData = new FormData();
        for (const key of Object.keys(files)) {
          formData.append("attachments", files[key]);
        }
      }
    } catch (error) {
      console.log(error);
   
    
    }
  }
  const [files, setFiles] = useState(null);
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
    assignmentSheet();
  }

  const activateLoading = () => {
    setLoading(true);
  }

  const deactivateLoading = () => {
    setLoading(false);
  }

  const assignmentSheet = async () => {
    try {
      setLoading(true);
      const { data } = await getAssignmentSheet();
      setAllAssignments(data.final_result.assignment_data);
      setFilteredAssignments(data.final_result.assignment_data);
      setClasses(data.final_result.faculty_data.classes);
      console.log(data);
    } catch (error) {
      console.log(error);
      openSnackBar("Some error occured");
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    assignmentSheet();
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
        text="Loading Announcement..."
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
            <Box  sx={{ bgcolor: '#FFFFFF', height: '85vh' , width:'70vh',marginLeft:'27rem' , padding:'3rem' ,border:'1px solid black'}}>

           
            <TextField
            
            id="class"
            select
            fullWidth
            label="*Select Class"
            value=""
            onChange=""
          >
             <MenuItem value='F9'>F9</MenuItem>
             <MenuItem value='T9'>T9</MenuItem>
             <MenuItem value='F19'>F19</MenuItem>
             <MenuItem value='F10'>F10</MenuItem>
             </TextField>
          
          <br/><br/>
            <TextField
            required
            id="outlined-required"
            label="Required"
            fullWidth label="Title" 
            placeholder="Title...."
          />
          <br/><br/>
          <TextField
          required
          id="outlined-textarea"
              
          fullWidth label="Message" 
          placeholder="Message...."
        />

            <br/><br/>
            <Button
            variant="contained"
            style={{
              margin: "0 15px",
              height: "50px",
              width: "45%",
              cursor: "pointer",
            }}
            onClick={handleOpenss}
            sx={{
              fontWeight: 'bolder'
            }}
          >
            Add Links
          </Button>
          <Modal
        open={openss}
        onClose={handleClosess}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <div className="title">

           {links.link}
         
         </div>
         <br/><br/>
              <div>
              <TextField
            required
            id="outlined-required"
            label="Required"
            fullWidth label="Title" 
            placeholder="Title...."
            
            onChange={handleInput1}
          />
          <br/><br></br>

          <TextField
            required
            id="outlined-required"
            label="Required"
            fullWidth label="Link" 
            placeholder="Link...."
           
            onChange={handleInput2}
          />
              
              </div>

        </Box>
      </Modal>
       <br/><br/>

       <div
              style={{
                position: "relative",
                margin: "0 15px",
                height: "50px",
              }}
            >
              {files ? (
                <Button
                  variant="contained"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    height: "50px",
                    width: "50%",
                    cursor: "pointer",
                  }}
                  sx={{
                    fontWeight: 'bolder'
                  }}
                >
                  {document.getElementById("attachments").files.length} file(s)
                  selected
                </Button>
              ) : (
                <Button
                  variant="contained"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    height: "50px",
                    width: "50%",
                    cursor: "pointer",
                  }}
                  sx={{
                    fontWeight: 'bolder'
                  }}
                >
                  Select Attachments
                </Button>
              )}

              <input
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  height: "50px",
                  width: "50%",
                  opacity: "0",
                  cursor: "pointer",
                }}
                sx={{
                  margin: "15px",
                }}
                type="file"
                name="attachments"
                id="attachments"
                multiple
                onChange={(e) => {
                  setFiles(e.target.files);
                  console.log(files);
                }}
              />
            </div>
            <br/>
            
          <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            m: "auto",
            width: "fit-content",
            minWidth: "90%",
            margin: "0px 15px",
          }}
          noValidate
          autoComplete="off"
        >
        
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
            className='startdate'
              sx={{
                margin: "15px",
                backgroundColor: "#fff !important",
                flex: "1",
              }}
              minDateTime={new Date()}
              showDaysOutsideCurrentMonth={true}
              label="Select Date"
              value=""
              onChange=""
              renderInput={(params) => (
                <TextField
                 className='startdate'
                  sx={{
                    backgroundColor: "#fff !important",
                    margin: "15px",
                  }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>

          <div>
            <Button
              size="small"
              variant="outlined"
              sx={{
                fontWeight: "bolder",
              }}
              disabled=""
              onClick=""
            >
              Remove Date
            </Button>
          </div>
          </Box>
                
          <br/>
          <Button
          variant="contained"
          style={{
           marginLeft:'4.5rem',
            height: "40px",
            width: "40%",
            cursor: "pointer",
          }}
          sx={{
            fontWeight: 'bolder'
          }}
        >
          Publish
        </Button>
          </Box>
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
