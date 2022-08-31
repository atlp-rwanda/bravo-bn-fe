import logo from '../assets/barefoot_logo.svg';
import { Link, NavLink, Outlet } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector } from 'react-redux';

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [invisible, setInvisible] = React.useState(false);
  const user= useSelector(state=> state.login.user);
const pages = [['Home','/'], [`${user.role == 'requester'? 'Trip requests':'Dashboard' }`,`${user.role == 'requester'? '/trip-requests':'/dashboard' }`], ['About Us','/about']];
const settings = [['Profile','/profile'], ['Account','/account'], ['Logout','']];


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


/*   const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  }; */

  return (
      <>
    <AppBar position="static" className="navbar" >
      <Container maxWidth="xl"  >
        <Toolbar disableGutters >
          <Typography
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Link to="/"> <img src={logo} alt="Logo"/></Link>
          </Typography>
         

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link to={page[1]} className="navlink"> {page[0]}</Link></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
            }}
          >
            <img src={logo} alt="Logo"/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
            {pages.map((page) => (
              <Button
                key={page[0]}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <NavLink to={page[1]} className="navlink"> {page[0]}</NavLink>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
            </IconButton>
            <Badge color="secondary" variant="dot" color='error' sx={{ margin:'0 20px'}} invisible={invisible}>
                <NotificationsIcon className="notification-icon" />
        </Badge>
        {/* <FormControlLabel
          sx={{ color: 'text.primary' }}
          control={<Switch checked={!invisible} onChange={handleBadgeVisibility} />}
        /> */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting[0]} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting[0]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Outlet/>
    </>
  );
};
export default Nav;