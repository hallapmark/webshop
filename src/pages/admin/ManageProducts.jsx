import { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import useEffectFetch from "../../hooks/useEffectFetch";
import useChangeFetch from "../../hooks/useChangeFetch";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  // const navigate = useNavigate();
  // const { token, logout } = useContext(AuthContext);
  const dbProducts = useEffectFetch("/products?categoryId=0", "Failed to load products");
  const [ deleteProduct, returnedProducts ] = useChangeFetch("/products");

  useEffect(() => {
    setProducts(dbProducts)
  }, [dbProducts]);

  useEffect(() => {
    setProducts(returnedProducts)
  }, [returnedProducts]);

  return (
    <Box>
      <Typography variant="h1" sx={{ textAlign: "center", my: 1.5 }}>Manage Products</Typography>
      {/* https://mui.com/material-ui/react-table/ */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product name</TableCell>
              <TableCell align="right">Product id</TableCell>
              <TableCell align="right">Product price</TableCell>
              <TableCell align="right">Change</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{product.name}</TableCell>
              <TableCell align="right">{product.id}</TableCell>
              <TableCell align="right">{product.price}€</TableCell>
              <TableCell align="right">
                <Button component={RouterLink} to={"/edit-product/" + product.id} variant="contained" color="warning" size="small">
                  Change
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button variant="contained" color="error" size="small" onClick={() => deleteProduct(product.id)}>
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
export default ManageProducts