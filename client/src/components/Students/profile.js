import React, { useState, useEffect,useHistory } from "react";
import "./profile.css"
import { styled, useTheme } from "@mui/material/styles";
import {getprofileDetails } from '../../services/student'
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
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
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StudentAppBar from './StudentAppBar';
import "./attendance.css";
// import moment from "moment";
import {
  getAttendanceSheet,
  postAttendanceSheet,
} from "../../services/faculty";
import { Link, useRouteMatch } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import LoadingOverlay from "react-loading-overlay";



function createData(name, calories, fat, carbs, protein, six, seven, eight) {
  return { name, calories, fat, carbs, protein, six, seven, eight };
}

const rows = [
  createData('Monday', "ADBA", "ACN", "", "ST", "CNS", "GROUP B CNS", "GROUP A ST"),
  createData('Tuesday', "", "", "", "", "", "", ""),
  createData('Wednesday', "", "", "", "", "", "", ""),
  createData('Thursday', "", "", "", "", "", "", ""),
  createData('Friday', "", "", "", "", "", "", ""),
  createData('Saturday', "", "", "", "", "", "", ""),

];


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

  const [classes, setClasses] = useState([
    {
      class_id: "F901",
      subject_name: "Subject 1",
      section: "F9",
      all_students: [
        {
          roll_no: "101",
          name: "Gaurav Kumar",
          is_present: false,
        },
        {
          roll_no: "102",
          name: "R. Akshaya",
          is_present: false,
        },
        {
          roll_no: "103",
          name: "Akshay Jain",
          is_present: false,
        },
        {
          roll_no: "104",
          name: "Pooja",
          is_present: false,
        },
      ],
    },
    {
      class_id: "F902",
      subject_name: "Subject 2",
      section: "F9",
      all_students: [
        {
          roll_no: "101",
          name: "Gaurav Kumar",
          is_present: false,
        },
        {
          roll_no: "102",
          name: "R. Akshaya",
          is_present: false,
        },
        {
          roll_no: "103",
          name: "Akshay Jain",
          is_present: false,
        },
        {
          roll_no: "104",
          name: "Pooja",
          is_present: false,
        },
      ],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [submitLoad, setSubmitLoad] = useState(false);

  const postAttendance = async (details) => {
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

  const attendanceSheet = async () => {
    try {
      setLoading(true);
      const { data } = await getAttendanceSheet();
      setClasses(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      openSnackBar("Some error occured");
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    attendanceSheet();
  }, []);

  const [Sclass,setSclass]=useState([])

  const StudentClasses = async () => {
    try {
      setLoading(true);
      const { data } = await getprofileDetails();
      setSclass(data.result.classes)
      console.log(data);
    } catch (error) {
      console.log(error);
      openSnackBar("Some error occured");
      setLoading(false);
    }

    setLoading(false);
  };

  
  const[profileValue,setProfileValue]=useState([])

  const ProfileValues = async () => {
    try {
      setLoading(true);
      const { data } = await getprofileDetails();
       setProfileValue([{"Name":"Enrollment No:",
       "Value":data.result.roll_no
     },
     {"Name":"Name:",
       "Value":data.result.full_name
     },
     {"Name":"Email ID:",
       "Value":data.result.email
     },
     {"Name":"Contact No:",
       "Value":data.result.mobile
     },
     {"Name":"Course:",
       "Value":data.result.course
     },
      {"Name":"Section:",
       "Value":data.result.section
     },
     {"Name":"Year of Passing:",
       "Value":data.result.yop
     },
    
    
    ]); 
      console.log(data);
    } catch (error) {
      console.log(error);
      openSnackBar("Some error occured");
      setLoading(false);
    }

    setLoading(false);
  };
 

  useEffect(() => {
    ProfileValues();
  }, []);

  useEffect(() => {
    StudentClasses();
  }, []);

  useEffect(() => {}, [classes]);

  const [check, setCheck] = useState(false);

  const handleStudentAllCheck = (e) => {
    const state = e.target.checked;
    alert(state);
    setCheck(state);
    setClasses((c) => {
      return c.map((cl, idx) => {
        if (idx !== selected_class_idx) {
          return cl;
        } else {
          return {
            ...cl,
            all_students: cl.all_students.map((student) => {
              return {
                ...student,
                is_present: state,
              };
            }),
          };
        }
      });
    });
  };

  const handleStudentIndCheck = (event, r_no) => {
    const state = event.target.checked;
    let idx = classes[selected_class_idx].all_students.findIndex(
      (student) => student.roll_no === r_no
    );
    let new_array = classes[selected_class_idx].all_students;
    new_array[idx] = { ...new_array[idx], is_present: state };

    setClasses((c) => {
      return c.map((cl, idx) => {
        if (idx !== selected_class_idx) {
          return cl;
        } else {
          return {
            class_id: cl.class_id,
            subject_name: cl.subject_name,
            section: cl.section,
            all_students: new_array,
          };
        }
      });
    });
    // classes[selected_class_idx].all_students = new_array;

    // classes[selected_class_idx].all_students = classes[
    //   selected_class_idx
    // ].all_students.map((student) => {
    //   if (student.roll_no === r_no) {
    //     return {
    //       ...student,
    //       is_present: state,
    //     };
    //   } else {
    //     return student;
    //   }
    // });
    // if (state) {
    //   // added to list
    //   classes[selected_class_idx].present_students.push(r_no);
    // } else {
    //   // removed from list
    //   classes[selected_class_idx].present_students = classes[
    //     selected_class_idx
    //   ].present_students.filter((student) => student.roll_no !== r_no);
    // }

    // setClasses(classes);
    console.log(classes[selected_class_idx]);
  };

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

  
  return (
    <>
      <LoadingOverlay
        active={loading}
        spinner
        text="Loading Profile..."
      >
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <StudentAppBar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose}/>
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
          <CssBaseline />
          <Container maxWidth="sm">
             <Box sx={{ bgcolor: 'white', height: '90vh',width:'75vh' }} >

                          <h2 className='h'>Profile</h2>
             <table className="table">
             
           
                        {  profileValue.map((data)=>(
                                      
                          <tr className="cont">
                          <td><label htmlFor="" >{data.Name}&nbsp;&nbsp;</label></td>
                          <td><div className="sugar1"><p>{data.Value}</p></div></td>
                          </tr>
                        )
                          )} 
                       
              
               </table>

               
               
             
             </Box>
          </Container>
          <Container>
          
                              <h2 className='h'>My Classes</h2>
                       <br />
                
                  <Table  aria-label="simple table">
                  <TableHead>
                  <TableRow>
                  <TableCell  sx={{
                            fontWeight: "bold !important",
                            fontSize: "1rem !important",
                           
                          }}>Subject Id</TableCell>
                  <TableCell  sx={{
                            fontWeight: "bold !important",
                            fontSize: "1rem !important",
                          }}>Subject Name</TableCell>
                  <TableCell  sx={{
                            fontWeight: "bold !important",
                            fontSize: "1rem !important",
                          }}>Subject Type</TableCell>
                  <TableCell  sx={{
                            fontWeight: "bold !important",
                            fontSize: "1rem !important",
                          }} >Faculty Name</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {Sclass.map(data => (
                  <TableRow >
                  <TableCell component="th" scope="row">
                  {data.subject_id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                  {data.subject_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                  {(data.subject_type=== 1)? "Theory":(data.subject_type=== 2)? "Lab": "Tutorial"}
                  </TableCell>
                  <TableCell component="th" scope="row">
                  {data.faculty_name}
                  </TableCell>
                  </TableRow>
                  ))}
                  </TableBody>
                  </Table>

           
          </Container>
  
            
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
