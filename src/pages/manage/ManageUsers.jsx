import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import usersFile from "../../data/users.json"

function ManageUsers() {
  const [users, setUsers] = useState(usersFile.slice());

  function deleteUser(id) {
    const index = usersFile.findIndex((item) => item.id === id);
    usersFile.splice(index,1);
    setUsers(usersFile.slice());
  }

  return (
    <Box>
      {/* https://mui.com/material-ui/react-table/ */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User name</TableCell>
              <TableCell align="right">User id</TableCell>
              <TableCell align="right">User email</TableCell>
              <TableCell align="right">Change</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{user.name}</TableCell>
              <TableCell align="right">{user.id}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">
                <Button component={RouterLink} to={"/change-user/" + user.id} variant="contained" color="warning" size="small">
                  Change
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button variant="contained" color="error" size="small" onClick={() => deleteUser(user.id)}>
                  X
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
export default ManageUsers