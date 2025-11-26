import { Link as RouterLink } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography'

import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import usersFile from '../../data/users.json'


function Users() {
  const [users, setUsers] = useState(usersFile.slice());
  const { t } = useTranslation();
  const [sortNextFirstNameAZAsc, setSortNextFirstNameAZAsc] = useState(true);
  const [sortNextLastNameAZAsc, setSortNextLastNameAZAsc] = useState(true);
  const [lastSort, setLastSort] = useState(null); // 'first' | 'last' | null
  
  function sortFirstNameAZ() {
    const sorted = users.toSorted((a, b) =>
      sortNextFirstNameAZAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setUsers(sorted);
    setSortNextFirstNameAZAsc(!sortNextFirstNameAZAsc); 
    setLastSort('first');
  }

  function sortLastNameAZ() {
    const sorted = users.toSorted((a, b) =>
      sortNextLastNameAZAsc 
      ? getLastName(a.name).localeCompare(getLastName(b.name)) 
      : getLastName(b.name).localeCompare(getLastName(a.name))
    );
    setUsers(sorted);
    setSortNextLastNameAZAsc(!sortNextLastNameAZAsc); 
    setLastSort('last');
  }

  function getLastName(name) {
    return name.split(" ").slice(-1)[0];
  }

  function reset() {
    setUsers(usersFile.slice());
  }
    
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h1">{t('users.users')}</Typography>

      <Box
        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 1, mr: 2, gap: 1 }}
      >
        <Button 
          variant={lastSort === "first" ? "contained" : "outlined" }
          startIcon={<SortByAlphaIcon />} 
          onClick={sortFirstNameAZ}>
        First name
          {sortNextFirstNameAZAsc // if yes, we are CURRENTLY ZA
            ? <ArrowDownwardIcon fontSize="small" /> 
            : <ArrowUpwardIcon fontSize="small" />}
        </Button>
        <Button 
          variant={lastSort === "last" ? "contained" : "outlined" }
          startIcon={<SortByAlphaIcon />} 
          onClick={sortLastNameAZ}>
        Last name
          {sortNextLastNameAZAsc // if yes, we are CURRENTLY ZA
            ? <ArrowDownwardIcon fontSize="small" /> 
            : <ArrowUpwardIcon fontSize="small" />}
        </Button>
        <Button variant="outlined" onClick={reset}>
          Reset
        </Button>
      </Box>

      <Box display="flex" justifyContent="center">
        <List>
          {users.map((user) => (
            <ListItem disablePadding key={user.id} >
              <ListItemButton component={RouterLink} to={`/user/${user.id}`} >
                <ListItemText primary={user.name} secondary={user.email} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}
export default Users