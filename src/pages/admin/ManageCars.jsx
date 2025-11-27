import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";

import carsFile from "../../data/cars.json"


function ManageCars() {
  const [cars, setCars] = useState(carsFile.slice());

  function deleteCar(id) {
    const index = carsFile.findIndex((item) => item.id === id);
    carsFile.splice(index,1);
    setCars(carsFile.slice());
  }

  return (
    <Box>
      <Typography variant="h1" sx={{ textAlign: "center", my: 1.5 }}>Manage Cars</Typography>
      {/* https://mui.com/material-ui/react-table/ */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Car name</TableCell>
              <TableCell align="right">Car id</TableCell>
              <TableCell align="right">Car price</TableCell>
              <TableCell align="right">Car active</TableCell>
              <TableCell align="right">Car image</TableCell>
              <TableCell align="right">Change</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {cars.map((car) => (
            <TableRow
              key={car.id}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{car.name}</TableCell>
              <TableCell align="right">{car.id}</TableCell>
              <TableCell align="right">{car.price}€</TableCell>
              <TableCell align="right">{car.active ? "Active" : "Inactive"}</TableCell>
              <TableCell align="right">{car.image}</TableCell>
              <TableCell align="right">
                <Button component={RouterLink} to={"/change-car/" + car.id} variant="contained" color="warning" size="small">
                  Change
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button variant="contained" color="error" size="small" onClick={() => deleteCar(car.id)}>
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
export default ManageCars