import React, { useEffect, useRef, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import Autocomplete from '@mui/material/Autocomplete';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { faculty_sidebar_data } from "../../environments/sidebar_data";
import "./student-assignment.css";
import { Link, useRouteMatch } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import {
  getConversationsForStudent,
  getFacultiesForStudents,
  getMessagesForConversation,
  sendMessage,
  addConversation
} from "../../services/student";
import StudentAppBar from "./StudentAppBar";
import Conversation from "./chat/Conversation";
import "./queries.css";
import Message from "./chat/Message";
import { io } from "socket.io-client";

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

function Queries() {
  let { url } = useRouteMatch();
  const curr_url = "/" + url.split("/")[1];

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const postAttendance = async (details) => {
  //   try {
  //     setLoading(true);
  //     setSubmitLoad(true);
  //     const { data } = await postAttendanceSheet(details);
  //     console.log(data);
  //     openSnackBar(data.message);
  //   } catch (error) {
  //     console.log(error);
  //     openSnackBar("Some error occured");
  //     setLoading(false);
  //     setSubmitLoad(false);
  //   }

  //   setLoading(false);
  //   setSubmitLoad(false);
  // };

  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState(null);
  const [current_chat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [new_message, setNewMessage] = useState("");
  const [arrival_message, setArrivalMessage] = useState(null);
  const socket = useRef();
  const [user, setUser] = useState(null);
  const [faculties_list, setFacultiesList] = useState([]);
  const scrollRef = useRef();

  const addAndOrSelectConversation = async (faculty) => {
    let idx = -1;
    if (faculty !== null) {
      if (conversations.some((conv, i) => {
        if (conv.members.includes(faculty.uni_id)) {
          idx = i;
          return true;
        } else {
          return false;
        }
      })) {
        // select that conversation
        setCurrentChat(conversations[idx]);
      } else {
        // add and select that conversation
        let new_conv = {
          sender_id: user.id,
          receiver_id: faculty.uni_id
        };
        console.log(new_conv)
        const { data } = await addConversation(new_conv);
        console.log(data)
        setCurrentChat(data.data);
        setConversations(prev => [...prev, data.data]);
      }
    }
  }

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.sender_id,
        text: data.text,
        createdAt: Math.floor(Date.now() / 1000),
      });
    });
  }, []);

  useEffect(() => {
    arrival_message &&
      current_chat?.members.includes(arrival_message.sender) &&
      setMessages((prev) => [...prev, arrival_message]);
  }, [arrival_message, current_chat]);

  useEffect(() => {
    user && socket.current.emit("addUser", user?.id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  // useEffect(() => {
  //   socket?.on("welcome", (message) => {
  //     console.log(message);
  //   });
  // }, [socket]);

  const getConversations = async () => {
    try {
      const { data } = await getConversationsForStudent();
      setUser(data.user_data);
      setConversations(data.data);
    } catch (error) { }
  };

  const getFacultiesForChat = async () => {
    try {
      const { data } = await getFacultiesForStudents();
      setFacultiesList(data.faculties_list);
    } catch (error) { }
  }

  useEffect(() => {
    getFacultiesForChat();
    getConversations();
  }, []);

  const getMessages = async () => {
    try {
      const { data } = await getMessagesForConversation(current_chat?._id);
      setMessages(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, [current_chat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.id,
      text: new_message,
      conversation_id: current_chat._id,
    };

    const receiver_id = current_chat.members.find(
      (member) => member !== user.id
    );

    socket.current.emit("sendMessage", {
      sender_id: user.id,
      receiver_id,
      text: new_message,
    });

    try {
      const { data } = await sendMessage(message);
      setMessages([...messages, data.data]);
      setNewMessage("");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("note Message");

  const openSnackBar = (msg) => {
    setSnackbarMessage(msg);
    setSnackbar(true);
  };

  const closeSnackBar = () => {
    setSnackbar(false);
  };
  return (
    <>
      <LoadingOverlay active={loading} spinner text="Loading note Sheet...">
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <StudentAppBar
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
          <Box component="main" sx={{ flexGrow: 1, p: 0.25 }}>
            <DrawerHeader />

            <div className="messenger">
              <div className="chatMenu">
                <div className="chatMenuWrapper">
                  {
                    conversations && user && (
                      <Autocomplete
                        id="select-faculty"
                        sx={{ width: 300, marginRight: '7px' }}
                        options={faculties_list}
                        autoHighlight
                        onChange={(event, value) => {
                          // add conversation with this person and select it
                          console.log(value);
                          addAndOrSelectConversation(value);
                        }}
                        getOptionLabel={(option) => `${option.full_name}`}
                        renderOption={(props, option) => (
                          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option.full_name}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Faculty"
                            inputProps={{
                              ...params.inputProps,
                              autocomplete: 'off',
                              form: {
                                autocomplete: 'off',
                              }, // disable autocomplete and autofill
                            }}
                          />
                        )}
                      />
                    )
                  }
                  {conversations &&
                    user &&
                    conversations.map((conversation) => (
                      <div onClick={() => setCurrentChat(conversation)}>
                        <Conversation
                          conversation={conversation}
                          current_user={user}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="chatBox">
                <div className="chatBoxWrapper">
                  {current_chat ? (
                    <>
                      <div className="chatBoxTop">
                        {messages &&
                          messages.map((msg) => (
                            <div ref={scrollRef}>
                              <Message
                                message={msg}
                                own={msg.sender === user.id}
                              />
                            </div>
                          ))}
                      </div>
                      <div className="chatBoxBottom">
                        <textarea
                          style={{
                            resize: "none",
                          }}
                          className="chatMessageInput"
                          placeholder="Write a message"
                          onChange={(e) => setNewMessage(e.target.value)}
                          value={new_message}
                        ></textarea>
                        <Button
                          variant="contained"
                          sx={{
                            fontWeight: "bolder",
                          }}
                          style={{
                            marginLeft: "5px",
                          }}
                          onClick={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          Send
                          <span
                            style={{
                              marginLeft: "5px",
                              fontSize: "15px",
                            }}
                            class="material-icons"
                          >
                            send
                          </span>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <span className="noConversationText">
                      Open a conversation to start a chat
                    </span>
                  )}
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
      </LoadingOverlay>
    </>
  );
}

export default Queries;
