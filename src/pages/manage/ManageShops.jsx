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

import shopsFile from "../../data/tallinn_shops.json"

function ManageShops() {
  const [shops, setShops] = useState(shopsFile.slice());

  function deleteShop(id) {
    const index = shopsFile.findIndex((item) => item.id === id);
    shopsFile.splice(index,1);
    setShops(shopsFile.slice());
  }

  return (
    <Box>
      {/* https://mui.com/material-ui/react-table/ */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shop name</TableCell>
              <TableCell align="right">id</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Phone number</TableCell>
              <TableCell align="right">Change</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {shops.map((shop) => (
            <TableRow
              key={shop.id}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{shop.name}</TableCell>
              <TableCell align="right">{shop.id}</TableCell>
              <TableCell align="right">{shop.address}</TableCell>
              <TableCell align="right">{shop.telephone}</TableCell>
              <TableCell align="right">
                <Button component={RouterLink} to={"/change-shop/" + shop.id} variant="contained" color="warning" size="small">
                  Change
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button variant="contained" color="error" size="small" onClick={() => deleteShop(shop.id)}>
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
export default ManageShops