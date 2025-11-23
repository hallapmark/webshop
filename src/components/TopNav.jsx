import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";

// https://mui.com/material-ui/guides/minimizing-bundle-size/
// mui does not recommend 'import { AppBar } from ...' style imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate } from "react-router-dom";

function TopNav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); 

  // mui pop-up menu 'anchors' to the button it was opened from
  const handleManageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // de-anchor, close menu
  const handleManageClose = () => {
    setAnchorEl(null);
  };

  const handleMenuNavigate = (path) => {
    handleManageClose();
    navigate(path);
  };

  return (
    // Note to self: Box is like an enhanced'div' in mui-world
    <Box>
      <AppBar position="static">
        <Toolbar>
          {/* Make title extend with flexGrow, 
          we get the menu items pushed to the right*/}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" >
              Webshop
            </Typography>
          </Box>
          
          {/* https://mui.com/material-ui/integrations/routing/ */}
          <Button component={RouterLink} to="/cars" color="inherit">Cars</Button>

          {/* Admin dropdown */}
          {/* Simulates "admin" area, for now with no login needed 
          TODO: it's actually not a bad idea to add a basic login here later*/}
          <Button 
            color="inherit" 
            onClick={handleManageClick} 
            endIcon={<ArrowDropDownIcon />} >
            Admin
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleManageClose}
          >
            <MenuItem onClick={() => handleMenuNavigate("/manage-cars")}>Manage Cars</MenuItem>
            <MenuItem onClick={() => handleMenuNavigate("/manage-shops")}>Manage Shops</MenuItem>
            <MenuItem onClick={() => handleMenuNavigate("/manage-users")}>Manage Users</MenuItem>
            <MenuItem onClick={() => handleMenuNavigate("/manage-employees")}>Manage Employees</MenuItem>
            <MenuItem onClick={() => handleMenuNavigate("/manage-products")}>Manage Products</MenuItem>
          </Menu>

          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>

          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


export default TopNav;