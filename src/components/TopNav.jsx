// react imports
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// constants / dependency inject
import { LNG_KEY, LANGUAGE_MANUALLY_SET_KEY } from "../i18n";

// https://mui.com/material-ui/guides/minimizing-bundle-size/
// mui does not recommend 'import { AppBar } from ...' style imports
import AppBar from '@mui/material/AppBar';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// other
import { useTranslation } from "react-i18next";

function TopNav() {
  const [anchorElAdmin, setAnchorElAdmin] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate(); 
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    if (localStorage.getItem(LANGUAGE_MANUALLY_SET_KEY) === "true") {
      return;
    }

    let detectedLang = navigator.language;
    if (detectedLang.toLowerCase().includes("en-")) {
      detectedLang = "en" // Simplify English-language locales to one catch-all English-language locale
    }
    i18n.changeLanguage(detectedLang);
    localStorage.setItem(LNG_KEY, detectedLang);
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []) // eslint wants i18n reported as a dep, but i18n is stable and we only want to run the effect once.

  // mui pop-up menu 'anchors' to the button it was opened from
  const handleOpenAdminMenu = (event) => {
    setAnchorElAdmin(event.currentTarget);
  };
  // de-anchor, close menu
  const handleAdminMenuClose = () => {
    setAnchorElAdmin(null);
  };

  const handleAdminMenuNavigate = (path) => {
    handleAdminMenuClose();
    navigate(path);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  }

  const handleNavMenuClose = () => {
    setAnchorElNav(null);
  }

  const handleNavMenuNavigate = (path) => {
    handleNavMenuClose();
    navigate(path);
  };

  function updateLanguage(newLang) {
    i18n.changeLanguage(newLang);
    localStorage.setItem(LNG_KEY, newLang);
    localStorage.setItem(LANGUAGE_MANUALLY_SET_KEY, "true")
  }
  
  return (
    // Note to self: Box is like an enhanced'div' in mui-world
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Make title box extend with flexGrow, 
          we get all menu items after Cart pushed to the right*/}
          <Box sx={{ flexGrow: 1 }}>
            <Typography 
              variant="h6" 
              component={RouterLink} 
              to="/" 
              sx={{
                color: "inherit",
                textDecoration: "none",
                "&:hover": { textDecoration: "none" },
              }}
            > 
            {t('nav.webshop')}
            </Typography>
            <IconButton color="inherit" sx={{ ml: 2 }}>
              <ShoppingCartIcon />
            </IconButton>
          </Box>
          
          {/* https://mui.com/material-ui/integrations/routing/ */}
          {/* https://mui.com/material-ui/react-app-bar/ */}
          {/* Medium-to-xl: display menu items in a row */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button component={RouterLink} to="/cars" color="inherit">{t('nav.cars')}</Button>
            <Button component={RouterLink} to="/shops" color="inherit">{t('nav.shops')}</Button>
            <Button component={RouterLink} to="/users" color="inherit">{t('nav.users')}</Button>
            <Button component={RouterLink} to="/employees" color="inherit">{t('nav.employees')}</Button>
          </Box>

          {/* xs to sm (inclusive): hamburger nom nom*/}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleNavMenuClose}
            >
              <MenuItem onClick={() => handleNavMenuNavigate("/cars")}>Cars</MenuItem>
              <MenuItem onClick={() => handleNavMenuNavigate("/shops")}>Shops</MenuItem>
              <MenuItem onClick={() => handleNavMenuNavigate("/users")}>Users</MenuItem>
              <MenuItem onClick={() => handleNavMenuNavigate("/employees")}>Employees</MenuItem>
            </Menu>
          </Box>

          {/* Admin dropdown */}
          {/* Simulates "admin/manage" area, for now with no login needed 
          TODO: it's actually not a bad idea to add a basic login here later*/}
          <Button 
            onClick={handleOpenAdminMenu} 
            endIcon={<ArrowDropDownIcon />} 
            color="inherit" >
            Manage
          </Button>
          <Menu
            anchorEl={anchorElAdmin}
            open={Boolean(anchorElAdmin)}
            onClose={handleAdminMenuClose}
          >
            <MenuItem onClick={() => handleAdminMenuNavigate("/manage-cars")}>Manage Cars</MenuItem>
            <MenuItem onClick={() => handleAdminMenuNavigate("/manage-shops")}>Manage Shops</MenuItem>
            <MenuItem onClick={() => handleAdminMenuNavigate("/manage-users")}>Manage Users</MenuItem>
            <MenuItem onClick={() => handleAdminMenuNavigate("/manage-employees")}>Manage Employees</MenuItem>
            <MenuItem onClick={() => handleAdminMenuNavigate("/manage-products")}>Manage Products</MenuItem>
          </Menu>

          <IconButton color="inherit">
            <LanguageIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}


export default TopNav;