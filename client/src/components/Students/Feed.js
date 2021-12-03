import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import * as Muicon from "@material-ui/icons";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { faculty_sidebar_data } from "../../environments/sidebar_data";
import "./feed.css";
import moment from "moment";
import { getStudentBasicDetails } from "../../services/student";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

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

// const getIcon = (icon_name) => {
//   const Icon = Muicon[icon_name];
//   return `<${Icon} />`;
// };

function Feed() {
  let { url, path } = useRouteMatch();
  const curr_url = "/" + url.split("/")[1];
  const [days, setDays] = useState({
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
  });

  const [lunch_details, setLunchDetails] = useState({
    time: "11.00 - 11.30",
    name: "Lunch",
    faculty_name: "----",
  });

  const [slot_times, setSlotTimes] = useState([
    "09.10 - 10.05",
    "10.05 - 11.00",
    "11.30 - 12.25",
    "12.25 - 13.20",
    "13.20 - 14.15",
    "14.15 - 15.10",
  ]);

  const [holiday_time_table, setHolidayTimeTable] = useState([
    {
      slot_id: "D1S1",
      class_id: "ABC123",
      subject_name: "Holiday",
      faculty_name: "----",
    },
    {
      slot_id: "D1S2",
      class_id: "ABC123",
      subject_name: "Holiday",
      faculty_name: "----",
    },
    {
      slot_id: "D1S3",
      class_id: "ABC123",
      subject_name: "Holiday",
      faculty_name: "----",
    },
    {
      slot_id: "D1S4",
      class_id: "ABC123",
      subject_name: "Holiday",
      faculty_name: "----",
    },
    {
      slot_id: "D1S5",
      class_id: "ABC123",
      subject_name: "Holiday",
      faculty_name: "----",
    },
    {
      slot_id: "D1S6",
      class_id: "ABC123",
      subject_name: "Holiday",
      faculty_name: "----",
    },
  ]);

  const [todays_time_table, setTodaysTimeTable] = useState([
    {
      slot_id: "D1S1",
      class_id: "ABC123",
      subject_name: "Unalloted",
      faculty_name: "ABCXYZ",
    },
    {
      slot_id: "D1S2",
      class_id: "ABC123",
      subject_name: "Unalloted",
      faculty_name: "ABCXYZ",
    },
    {
      slot_id: "D1S3",
      class_id: "ABC123",
      subject_name: "Unalloted",
      faculty_name: "ABCXYZ",
    },
    {
      slot_id: "D1S4",
      class_id: "ABC123",
      subject_name: "Unalloted",
      faculty_name: "ABCXYZ",
    },
    {
      slot_id: "D1S5",
      class_id: "ABC123",
      subject_name: "Unalloted",
      faculty_name: "ABCXYZ",
    },
    {
      slot_id: "D1S6",
      class_id: "ABC123",
      subject_name: "Unalloted",
      faculty_name: "ABCXYZ",
    },
  ]);

  const [time_table, setTimeTable] = useState([
    [
      {
        slot_id: "D1S1",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D1S2",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D1S3",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D1S4",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D1S5",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D1S6",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
    ],
    [
      {
        slot_id: "D2S1",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D2S2",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D2S3",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D2S4",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D2S5",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D2S6",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
    ],
    [
      {
        slot_id: "D3S1",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D3S2",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D3S3",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D3S4",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D3S5",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D3S6",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
    ],
    [
      {
        slot_id: "D4S1",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D4S2",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D4S3",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D4S4",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D4S5",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D4S6",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
    ],
    [
      {
        slot_id: "D5S1",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D5S2",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D5S3",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D5S4",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D5S5",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D5S6",
        class_id: "ABC123",
        subject_name: "Unalloted",
        faculty_name: "ABCXYZ",
      },
    ],
    [
      {
        slot_id: "D6S1",
        class_id: "ABC123",
        subject_name: "class 1",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D6S2",
        class_id: "ABC123",
        subject_name: "class 2",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D6S3",
        class_id: "ABC123",
        subject_name: "class 3",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D6S4",
        class_id: "ABC123",
        subject_name: "class 4",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D6S5",
        class_id: "ABC123",
        subject_name: "class 5",
        faculty_name: "ABCXYZ",
      },
      {
        slot_id: "D6S6",
        class_id: "ABC123",
        subject_name: "class 1",
        faculty_name: "ABCXYZ",
      },
    ],
  ]);

  const [slot_details_anchor, setSlotDetailsAnchor] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);

  const toggleSlotDrawer = () => {
    if (slot_details_anchor === true) {
      setSelectedSlot(null);
      setSelectedSlotIndex(null);
    }
    setSlotDetailsAnchor(!slot_details_anchor);
  };

  const openSlotDrawer = (slot, idx) => {
    console.log(slot);
    setSelectedSlot(slot);
    setSelectedSlotIndex(idx);
    setSlotDetailsAnchor(true);
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [Student_details, setStudentDetails] = useState(null);

  const StudentBasicDetails = async () => {
    const { data } = await getStudentBasicDetails();
    console.log(data);
    setStudentDetails(data);
    setTimeTable(data.time_table);
    setTodaysTimeTable(data.todays_time_table);
  };

  useEffect(() => {
    StudentBasicDetails();
  }, []);

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

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
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
            <Box sx={{ flexGrow: 1 }}>
              <div className="floating-container">
                <div className="inner-container">
                  {moment().format("dddd") !== "Sunday"
                    ? time_table[days[moment().format("dddd")]].map(
                      (slot, idx) =>
                        slot.slot_id[3] === "2" ? (
                          <>
                            <div
                              className="slot"
                              onClick={() => {
                                openSlotDrawer(slot, idx);
                              }}
                            >
                              <div className="slot_time">
                                {slot_times[idx]}
                              </div>
                              <div className="slot_sub">
                                {slot.subject_name}
                              </div>
                              <div className="slot-sec">
                                {slot.faculty_name !== "ABCXYZ"
                                  ? slot.faculty_name
                                  : "NA"}
                              </div>
                            </div>
                            <div className="slot lunch">
                              <div className="slot_time">
                                {lunch_details.time}
                              </div>
                              <div className="slot_sub">
                                {lunch_details.name}
                              </div>
                              <div className="slot-sec">
                                {lunch_details.faculty_name}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div
                            className="slot"
                            onClick={() => {
                              openSlotDrawer(slot, idx);
                            }}
                          >
                            <div className="slot_time">{slot_times[idx]}</div>
                            <div className="slot_sub">
                              {slot.subject_name}
                            </div>
                            <div className="slot-sec">
                              {slot.faculty_name !== "ABCXYZ"
                                ? slot.faculty_name
                                : "NA"}
                            </div>
                          </div>
                        )
                    )
                    : holiday_time_table.map((slot, idx) => (
                      <div className="slot">
                        <div className="slot_time">{slot_times[idx]}</div>
                        <div className="slot_sub">{slot.subject_name}</div>
                        <div className="slot-sec">{slot.faculty_name}</div>
                      </div>
                    ))}
                  {/* {
                    moment().format("dddd") !== 'Sunday' ? (
                      time_table[days[moment().format("dddd")]].map((slot, idx) => (
                        <div className="slot">
                          <div className="slot_time">{slot_times[idx]}</div>
                          <div className="slot_sub">{slot.subject_name}</div>
                          <div className="slot-sec">
                            {slot.faculty_name !== "ABCXYZ" ? slot.faculty_name : "NA"}
                          </div>
                        </div>
                      ))
                    ) : (
                      holiday_time_table.map((slot, idx) => (
                        <div className="slot">
                          <div className="slot_time">{slot_times[idx]}</div>
                          <div className="slot_sub">{slot.subject_name}</div>
                          <div className="slot-sec">
                            {slot.faculty_name}
                          </div>
                        </div>
                      ))
                    )
                  } */}
                  {/* {
                    time_table[days[moment().format("dddd")]].map((slot) => (
                      <div className="slot">
                        <div className="slot_time">09:10 - 10:10</div>
                        <div className="slot_sub">{slot.subject_name}</div>
                        <div className="slot-sec">
                          {slot.faculty_name !== "ABCXYZ" ? slot.faculty_name : "NA"}
                        </div>
                      </div>
                    ))
                  } */}
                </div>
              </div>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
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
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
          </List>
          <Divider />
          {/* <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography paragraph style={{textAlign:"center" ,marginTop:150, fontSize:90}}>         

                 Student Section
           </Typography>
          <Typography paragraph>

          </Typography>
        </Box>
      </Box>
      <MuiDrawer
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
          },
          zIndex: 1000,
        }}
        variant="temporary"
        anchor="right"
        open={slot_details_anchor}
        onClose={toggleSlotDrawer}
      >
        {selectedSlot && (
          <List>
            <ListItem>
              <div className="slot-drawer">
                <div className="drawer-key">
                  Slot Time:&nbsp;&nbsp;&nbsp;
                  <div className="drawer-value">
                    {slot_times[selectedSlotIndex]}
                  </div>
                </div>
              </div>
            </ListItem>
            <ListItem>
              <div className="slot-drawer">
                <div className="drawer-key">
                  Subject:&nbsp;&nbsp;&nbsp;
                  <div className="drawer-value">
                    {selectedSlot.subject_name}
                  </div>
                </div>
              </div>
            </ListItem>
            <ListItem>
              <div className="slot-drawer">
                <div className="drawer-key">
                Faculty Name:&nbsp;&nbsp;&nbsp;
                  <div className="drawer-value">{selectedSlot.faculty_name}</div>
                </div>
              </div>
            </ListItem>
            <ListItem>
              <div className="slot-drawer">
                <div className="drawer-key">
                  Class Link:&nbsp;&nbsp;&nbsp;
                  <div className="drawer-value">
                    {selectedSlot.link
                      ? selectedSlot.link.title
                      : "Link Not available"}
                  </div>
                </div>
              </div>
            </ListItem>
          </List>
        )}
      </MuiDrawer>
    </>
  );
}

export default Feed;
