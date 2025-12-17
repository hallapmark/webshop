import { useContext, useEffect, useState, type FormEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import useEffectFetch from "../../hooks/useEffectFetch";
import useChangeFetch from "../../hooks/useChangeFetch";

import type { Category } from "../../models/Category"
import type { Product, ProductInput } from "../../models/Product"

import Box from '@mui/material/Box';

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

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
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  const authHeaders = token ? { "Authorization": "Bearer " + token } : undefined;
  const dbProducts = useEffectFetch<Product>("/admin/products", "Failed to load products",  authHeaders);
  const categories = useEffectFetch<Category>("/categories", "Failed to fetch categories");
  const [ deleteProduct, returnedProducts ] = useChangeFetch<Product>("/products");
  // Product deletion modal
  const [confirmMenuOpen, setConfirmMenuOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Accordion open state for the Add Product form
  const [addOpen, setAddOpen] = useState(false);
  // Form state for adding a product
  // TODO: use ... syntax and create a single Product object
  // const [productToBeAdded, setProductToBeAdded] = useState(
  //   Product
  // )
  const initialProduct: ProductInput = {
    name: "",
    slug: "",
    description_en: "",
    description_et: "",
    price: 0,
    categoryId: 0,
  };
  const [productToBeAdded, setProductToBeAdded] = useState<ProductInput>(initialProduct);
  
  // Sync products from server and from change hook
  useEffect(() => {
    setProducts(dbProducts)
  }, [dbProducts]);

  useEffect(() => {
    setProducts(returnedProducts)
  }, [returnedProducts]);

  const handleAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, slug, description_en, description_et, price, categoryId } = productToBeAdded;

    if (!name || !slug || !description_en || !description_et || price <= 0 || categoryId <= 0) {
      toast.error("Please fill name, description (ENG), description (EST), price (>0) and category");
      return;
    }

    const payload: ProductInput = productToBeAdded;

    try {
      const headers: HeadersInit = { "Content-Type": "application/json" };
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
      setProductToBeAdded(initialProduct);
      setAddOpen(false);
      toast.success("Product added!");

    } catch (err) {
      console.error(err);
      toast.error("Error adding product");
    }
  };

  const askConfirmProductDelete = (product: Product) => {
    setProductToDelete(product);
    setConfirmMenuOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    deleteProduct(productToDelete.id);
    setConfirmMenuOpen(false);
    setProductToDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmMenuOpen(false);
    setProductToDelete(null);
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
              value={productToBeAdded.name}
              onChange={e => setProductToBeAdded(p => ({ ...p, name: e.target.value }))}
            />
            <TextField 
              label="URL Slug"
              required
              value={productToBeAdded.slug}
              onChange={e => setProductToBeAdded(p => ({ ...p, slug: e.target.value }))}
            />
            <TextField
              label="Description (English)"
              required
              multiline
              rows={3}
              value={productToBeAdded.description_en}
              onChange={e => setProductToBeAdded(p => ({ ...p, description_en: e.target.value }))}
            />
            <TextField
              label="Description (Estonian)"
              required
              multiline
              rows={3}
              value={productToBeAdded.description_et}
              onChange={e => setProductToBeAdded(p => ({ ...p, description_et: e.target.value }))}
            />
            <TextField
              label="Price"
              required
              type="number"
              inputMode="decimal"
              value={productToBeAdded.price === 0 ? "" : productToBeAdded.price}
              onChange={e => setProductToBeAdded(p => ({ ...p, price: e.target.value === "" ? 0 : Number(e.target.value) }))}
            />
            <FormControl>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                label="Category"
                value={productToBeAdded.categoryId}
                onChange={e => setProductToBeAdded(p => ({ ...p, categoryId: Number(e.target.value) }))}
              >
                <MenuItem value={0}>None</MenuItem>
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
                <Button variant="contained" color="error" size="small" onClick={() => askConfirmProductDelete(product)}>
                  X
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={confirmMenuOpen}
        onClose={handleCancelDelete}
        aria-describedby="delete-product-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="delete-product-dialog-description">
            Delete product "{productToDelete?.name}?"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancelDelete}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleConfirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
    </Box>
  )
}
export default ManageProducts