// react, react router
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

// https://mui.com/material-ui/guides/minimizing-bundle-size/
// mui does not recommend 'import { AppBar } from ...' style imports
import AppBar from '@mui/material/AppBar';
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
import Badge from '@mui/material/Badge';

// other
import { useTranslation } from "react-i18next";
import { LNG_KEY, LANGUAGE_MANUALLY_SET_KEY, LANGUAGES } from "../i18n";
import { CartSumContext } from "../context/CartSumContext";
import { AuthContext } from "../context/AuthContext";


function TopNav() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);
  const navigate = useNavigate(); 
  const { t, i18n } = useTranslation();
  const { cartSum } = useContext(CartSumContext);
  const { loggedIn, logout } = useContext(AuthContext);

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

  const handleOpenLangMenu = (event) => {
    setAnchorElLang(event.currentTarget);
  }

  const handleLangMenuClose = () => {
    setAnchorElLang(null);
  }

  const handleLangMenuChoice = (newLang) => {
    handleLangMenuClose();
    updateLanguage(newLang);
  }

  function updateLanguage(newLang) {
    i18n.changeLanguage(newLang);
    localStorage.setItem(LNG_KEY, newLang);
    localStorage.setItem(LANGUAGE_MANUALLY_SET_KEY, "true")
  }
  
  return (
    // https://mui.com/material-ui/react-app-bar/
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>     
          {/* Note to self: Box is like an enhanced 'div' in mui-world */}
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
            <IconButton 
              color="inherit" 
              sx={{ ml: 2 }} 
              aria-label="Open shopping cart" 
              component={RouterLink}
              to="/cart"
            >
              {/* Todo: Add the badge back in when we can update the cart state ... hmm */}
              {/* <Badge
                badgeContent={2}
                overlap="circular"
                slotProps={{ badge: { sx: { bgcolor: 'accent.main', color: 'accent.contrastText' } } }}
              > */}
                <ShoppingCartIcon />
                {cartSum.toFixed(2)}€
              {/* </Badge> */}
            </IconButton>
          </Box>
          
          {/* https://mui.com/material-ui/integrations/routing/ */}
          {/* Medium-to-xl: display menu items in a row */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button component={RouterLink} to="/shops" color="inherit">{t('nav.shops')}</Button>
            <Button component={RouterLink} to="/employees" color="inherit">{t('nav.employees')}</Button>
          </Box>

          {/* xs to sm (inclusive): hamburger nom nom*/}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
              aria-label="Open navigation menu"
              aria-controls={anchorElNav ? 'nav-menu' : undefined}
              aria-haspopup="menu"
              aria-expanded={Boolean(anchorElNav)}
            >
              {/* Adding aria-controls on this component. Seems like a good place to start, since it's the main navigation */}
              {/* TODO: Difficult to test? Are there online tools to test these work as expected, or do you need a physical device?*/}
              <MenuIcon />
            </IconButton>
            <Menu
              id="nav-menu"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)} // evaluates true if we've got an html element in anchorElNav
              onClose={handleNavMenuClose}
            >
              <MenuItem onClick={() => handleNavMenuNavigate("/shops")}>{t('nav.shops')}</MenuItem>
              <MenuItem onClick={() => handleNavMenuNavigate("/users")}>{t('nav.users')}</MenuItem>
              <MenuItem onClick={() => handleNavMenuNavigate("/employees")}>{t('nav.employees')}</MenuItem>
            </Menu>
          </Box>

          {/* Admin */}
          {/* Simulates "admin/manage" area, for now with no login needed 
          TODO: add login here later*/}
          {loggedIn ? 
            <Box>
              <Button onClick={logout} color="inherit">Logout</Button>
              <Button
                component={RouterLink}
                to="/profile"
                color="inherit"
              >
                Profile
              </Button>
              <Button
                component={RouterLink}
                to="/admin"
                color="inherit"
              >
                {t('nav.admin')}
              </Button>
            </Box>
            : 
              <Box>
                <Button component={RouterLink} to="/signup" color="inherit">Sign up</Button>
                <Button component={RouterLink} to="/login" color="inherit">Login</Button>
              </Box>
          }

          <IconButton 
            color="inherit"
            onClick={handleOpenLangMenu}
            aria-label="Open language menu"
            aria-controls={anchorElLang ? 'language-menu' : undefined}
            aria-haspopup="menu"
            aria-expanded={Boolean(anchorElLang)}
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            id="language-menu"
            anchorEl={anchorElLang}
            open={Boolean(anchorElLang)}
            onClose={handleLangMenuClose}
          >
            { LANGUAGES.map((lng) => (
              <MenuItem key={lng.code} onClick={() => handleLangMenuChoice(lng.code)}>
                <Box
                  component="img"
                  src={lng.src}
                  alt={lng.label}
                  sx={{ width: 24, height: 24, mr: 1, borderRadius: '4px' }}
                />
                {lng.label}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}


export default TopNav;