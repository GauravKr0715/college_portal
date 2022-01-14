import React from 'react';
import { styled, useTheme } from "@mui/material/styles";
import FileSaver from 'file-saver';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MuiAppBar from "@mui/material/AppBar";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import Logout from '@mui/icons-material/Logout';
import { logoutAdmin } from '../../services/authentication';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { environment } from '../../environments/environment';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

function AdminAppBar(props) {
  const [open, setOpen] = React.useState(props.open);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const profileOpen = Boolean(anchorEl);

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  const menuId = "primary-search-account-menu";

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  const saveFile = () => {
    FileSaver.saveAs(
      environment.apiUrl + `static/${props.button.path}`,
      "csv-file-format.csv"
    );
  }

  const adminLogout = async () => {
    try {
      await logoutAdmin();
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  }

  console.log(props.open);

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        {
          !open ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                props.handleDrawerOpen();
                setOpen(true);
              }}
              edge="start"
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                props.handleDrawerClose();
                setOpen(false);
              }}
              edge="start"
              sx={{
                marginRight: "36px",
                ...(!open && { display: "none" }),
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          )
        }

        {/* <Typography variant="h6" noWrap component="div">
              Mini variant drawer
            </Typography> */}
        <Box sx={{ flexGrow: 1 }}></Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {/* {
            props.button && (
              <Stack spacing={2} direction="row">
                <Button variant="outlined" style={{ backgroundColor: "white", fontWeight: "bold" }} onClick={saveFile} className="filebtn">{props.button.title}</Button>

              </Stack>
            )
          } */}
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
          <Menu
            anchorEl={anchorEl}
            open={profileOpen}
            onClose={handleProfileMenuClose}
            onClick={handleProfileMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                '& .MuiList-root': {
                  color: '#000 !important',
                  fontWeight: '700'
                },
                '& .MuiMenu-paper': {
                  backgroundColor: '#fff'
                },
                '& .MuiMenu-list': {
                  backgroundColor: '#fff',
                  color: '#000'
                }
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={adminLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default AdminAppBar
