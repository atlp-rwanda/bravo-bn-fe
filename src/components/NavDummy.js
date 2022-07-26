import logo from "../assets/barefoot_logo.svg";
import { Link, NavLink, Outlet } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PopupModal from './Profile/ViewProfileModel';
import { authActions } from "../redux/auth/authSlice";
import NotificationsPopover from "./Notifications/NotificationPopover";

const Nav = () => {
  const jwtToken = ("; " + document.cookie).split(`; jwt=`).pop().split(";")[0];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [invisible, setInvisible] = React.useState(true);
  const [Logout, setLogout] = React.useState("");
  const user = useSelector((state) => state.login.user);
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pages = [
    ["Home", "/"],
    [
      `${user.role == "requester" ? "Trip requests" : "Dashboard"}`,
      `${user.role == "requester" ? "/trip-requests" : "/dashboard"}`,
    ],
    ["About Us", "/about"],
  ];
  const settings = [
    ["Profile", "/profile"],
    ["Logout", ""],
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  const handleLogout = async () => {
    try {

      const res = await axios.get(`${process.env.API_URL}/user/auth/logout`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      if (res) {
        
    dispatch(authActions.login({ token: null }));
        deleteAllCookies();
        localStorage.clear()
        navigate("/login");

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PopupModal open={open} setOpen={setOpen} />
      <AppBar position="static" className="navbar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              <Link to="/">
                {" "}
                <img src={logo} alt="Logo" />
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                className="menu-icon"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to={page[1]} className="navlink">
                        {" "}
                        {page[0]}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".3rem",
              }}
            >
              <img src={logo} alt="Logo" />
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex", justifyContent: "center" },
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page[0]}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <NavLink to={page[1]} className="navlink">
                    {" "}
                    {page[0]}
                  </NavLink>
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Badge
                color="secondary"
                variant="dot"
                sx={{ margin: "0 20px" }}
                invisible={invisible}
              >
                <NotificationsPopover />
              </Badge>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={`${user.image}`} alt={`${user.username}`} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting[0]} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        if (setting[0] === "Logout") {
                          handleLogout();
                        }
                        else if (setting[0] == "Profile") { setOpen(true) }
                      }}
                    >
                      {setting[0]}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};
export default Nav;

