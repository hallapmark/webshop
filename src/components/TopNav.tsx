// react, react router
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext, useState, type MouseEvent } from "react";

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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';
// import Badge from '@mui/material/Badge';

// other
import { useTranslation } from "react-i18next";
import { LNG_KEY, LANGUAGE_MANUALLY_SET_KEY, LANGUAGES } from "../i18n";
import { CartSumContext } from "../context/CartSumContext";
import { AuthContext } from "../context/AuthContext";
import { Badge } from "@mui/material";
import { useAppSelector } from "../store/hooks";


function TopNav() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);
  const navigate = useNavigate(); 
  const { t, i18n } = useTranslation();
  const { cartSum } = useContext(CartSumContext);
  const { loggedIn, logout } = useContext(AuthContext);
  const count = useAppSelector(state => state.counter.value);

  const handleOpenNavMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElNav(event.currentTarget);
  }

  const handleNavMenuClose = () => {
    setAnchorElNav(null);
  }

  const handleNavMenuNavigate = (path: string) => {
    handleNavMenuClose();
    navigate(path);
  };

  const handleOpenLangMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElLang(event.currentTarget);
  }

  const handleLangMenuClose = () => {
    setAnchorElLang(null);
  }

  const handleLangMenuChoice = (newLang: string) => {
    handleLangMenuClose();
    updateLanguage(newLang);
  }

  function updateLanguage(newLang: string) {
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
          {/* Home icon on xs (with tooltip) and text on sm+ */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
            <Tooltip title={t('nav.webshop')}>
              <IconButton
                component={RouterLink}
                to="/"
                color="inherit"
                aria-label={t('nav.webshop')}
                sx={{ display: { xs: 'inline-flex', sm: 'none' }, mr: 1 }}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>

            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                display: { xs: 'none', sm: 'block' },
                color: "inherit",
                textDecoration: "none",
                "&:hover": { textDecoration: "none" },
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
              }}
            >
              {t('nav.webshop')}
            </Typography>
          </Box>

          {/* Cart Icon */}
          <IconButton 
            color="inherit" 
            aria-label="Open shopping cart" 
            component={RouterLink}
            to="/cart"
            sx={{ ml: 1 }}
          >
            <Badge badgeContent={count} sx={{ mx: 1 }}>
              <ShoppingCartIcon />
            </Badge>
            {/* hide price on extra-small screens to save space */}
            <Typography component="span" sx={{ display: { xs: 'none', sm: 'inline' }, ml: 0.5 }}>
              {cartSum.toFixed(2)}€
            </Typography>
          </IconButton>

          {/* spacer to push remaining items to the right */}
          <Box sx={{ flexGrow: 1 }} /> 
          
          {/* https://mui.com/material-ui/integrations/routing/ */}
          {/* Medium-to-xl: display shops and employees menu items in a row */}
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
              <MenuItem onClick={() => handleNavMenuNavigate("/employees")}>{t('nav.employees')}</MenuItem>
            </Menu>
          </Box>

          {/* Admin, Logout, Login depending on auth state */}
          {loggedIn ? 
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* full text on sm+ */}
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Button
                  component={RouterLink}
                  to="/admin"
                  color="inherit"
                >
                  {t('nav.admin')}
                </Button>
                <Button onClick={logout} color="inherit">Logout</Button>
              </Box>
              {/* compact icons on xs: Admin, Logout (Profile icon is shown separately next to the language icon) */}
              <Box sx={{ display: { xs: 'flex', sm: 'none' }, gap: 0.5 }}>
                <IconButton component={RouterLink} to="/admin" color="inherit" aria-label="Admin">
                  <AdminPanelSettingsIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Logout" onClick={logout}>
                  <LogoutIcon />
                </IconButton>
              </Box>
            </Box>
            : 
            // Not logged in, show signup and login
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  <Button component={RouterLink} to="/signup" color="inherit">Sign up</Button>
                  <Button component={RouterLink} to="/login" color="inherit">Login</Button>
                </Box>
                <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                  <IconButton component={RouterLink} to="/signup" color="inherit" aria-label="Sign up">
                    <PersonAddIcon />
                  </IconButton>
                  <IconButton component={RouterLink} to="/login" color="inherit" aria-label="Login">
                    <LoginIcon />
                  </IconButton>
                </Box>
              </Box>
          }

          {loggedIn && (
            <IconButton component={RouterLink} to="/profile" color="inherit" aria-label="Profile" sx={{ mr: 1 }}>
              <AccountCircleIcon />
            </IconButton>
          )}
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