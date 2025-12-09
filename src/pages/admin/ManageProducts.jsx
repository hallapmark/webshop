import { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

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
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);

  useEffect(() => {
  fetch("http://localhost:8080/products?categoryId=0")
    .then(res => {
      if (!res.ok) throw new Error("Failed to load products");
      return res.json();
    })
    .then(json => setProducts(json.content))
    .catch(error => {
      console.error("Error loading products:", error);
    });
}, []);

  function deleteProduct(id) {
    fetch("http://localhost:8080/products?id=" + id, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
     .then(res => {
      if (!res.ok) {
        // Parse error response regardless of status code
        return res.json().catch(() => {
          // If JSON parsing fails, throw generic error
          throw new Error("Request failed");
        });
      }
      return res.json();
    })
     .then(json => {
      // check if it is an error response
      if (json.message && json.timestamp && json.status) {
        if (json.message === "Token expired") {
          // Clear token and redirect to login
          logout()
          navigate("/login");
        } else {
          alert(json.message);
        }
      } else {
        setProducts(json);
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred");
    });
  }

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