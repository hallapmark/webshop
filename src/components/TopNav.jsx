import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

function TopNav() {
  const [anchorEl, setAnchorEl] = useState(null);

  // mui pop-up menu 'anchors' to the button it was opened from
  const handleManageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleManageClose = () => {
    setAnchorEl(null);
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

          <Button color="inherit">Cars</Button>
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
            <MenuItem onClick={handleManageClose}>Manage Cars</MenuItem>
            <MenuItem onClick={handleManageClose}>Manage Shops</MenuItem>
            <MenuItem onClick={handleManageClose}>Manage Users</MenuItem>
            <MenuItem onClick={handleManageClose}>Manage Employees</MenuItem>
            <MenuItem onClick={handleManageClose}>Manage Products</MenuItem>
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