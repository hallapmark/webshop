import { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import useEffectFetch from "../../hooks/useEffectFetch";
import useChangeFetch from "../../hooks/useChangeFetch";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast, ToastContainer } from "react-toastify";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  const dbProducts = useEffectFetch("/products?categoryId=0", "Failed to load products");
  const categories = useEffectFetch("/categories", "Failed to fetch categories");
  const [ deleteProduct, returnedProducts ] = useChangeFetch("/products");

  // Sync products from server and from change hook
  useEffect(() => {
    setProducts(dbProducts)
  }, [dbProducts]);

  useEffect(() => {
    setProducts(returnedProducts)
  }, [returnedProducts]);

  // Form state for adding a product
  // TODO: use ... syntax and create a single Product object
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionEt, setDescriptionEt] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  // Accordion open state for the Add Product form
  const [addOpen, setAddOpen] = useState(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!name || !slug || !descriptionEn || !descriptionEt || !price || !categoryId) {
      toast.error("Please fill name, description (ENG), description (EST), price and category");
      return;
    }

    const payload = {
      name,
      slug,
      description_en: descriptionEn,
      description_et: descriptionEt,
      price: Number(price),
      category: { id: Number(categoryId) }
    };

    try {
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = "Bearer " + token;
      }

      const res = await fetch("http://localhost:8080/products", {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        if (json && json.message && json.status) {
          if (json.message === "Token expired") {
            logout();
            navigate("/login");
          } else {
            toast.error(`${json.message}. Status: ${json.status}`);
          }
        } else {
          toast.error("Failed to add product");
        }
        return;
      }

      setProducts(json);

      // Reset form
      setName("");
      setSlug("");
      setDescriptionEn("");
      setDescriptionEt("");
      setPrice("");
      setCategoryId("");
      setAddOpen(false);
      toast.success("Product added!");

    } catch (err) {
      console.error(err);
      toast.error("Error adding product");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h1" sx={{ textAlign: "center", my: 1.5 }}>Manage Products</Typography>
      <Accordion expanded={addOpen} onChange={(_, isExpanded) => setAddOpen(isExpanded)} sx={{ maxWidth: 680, width: "100%", my: 4 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="h5">Add Product</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box 
            component="form"
            onSubmit={handleAddProduct}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField 
              label="Product name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              label="Description (English)"
              required
              multiline
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <TextField
              label="Description (Estonian)"
              required
              multiline
              rows={3}
              value={descriptionEst}
              onChange={e => setDescriptionEst(e.target.value)}
            />
            <TextField
              label="Price"
              required
              type="number"
              inputMode="decimal"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
            <FormControl>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                label="Category"
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                {categories.map(cat => (
                  <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" type="submit">Add Product</Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* https://mui.com/material-ui/react-table/ */}
      <TableContainer component={Paper} sx={{ my: 2 }}>
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
      <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
    </Box>
  )
}
export default ManageProducts