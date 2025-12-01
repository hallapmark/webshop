import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent';
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { toast, ToastContainer } from "react-toastify";


function Home() {
  const [products, setProducts] = useState([]); 
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [sort, setSort] = useState("id,asc");

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(json => {
        setCategories(json);
      })
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/products?size=${size}&page=${page}&categoryId=${selectedCategory}&sort=${sort}`)
      .then(res => res.json())
      .then(json => {
        setProducts(json.content)
        setTotalPages(json.totalPages)
      })
  }, [page, size, selectedCategory, sort]);
  // filtreerimised pigem backendis teha. isegi sorteerimisi tehakse tihti backendis (TODO!)
  // lehekylgede kaupa võiks ka olla lõpuks

  const addToCart = (product) => {
    const cartLS = JSON.parse(localStorage.getItem("cart")) || [];
    cartLS.push(product);
    localStorage.setItem("cart", JSON.stringify(cartLS));
    toast.success(product.name + " added to cart!");
  }

  function changeSize(newValue) {
    setSize(newValue);
    setPage(0);
  }

  function changeSelectedCategory(newValue) {
    setSelectedCategory(newValue);
    setPage(0);
  }

  function changeSort(newValue) {
    setSort(newValue);
    setPage(0);
  }

  return (
    <Box m={4}>
      <Typography variant="h1" gutterBottom>Webshop</Typography>
      <br />
      <Button component={RouterLink} to="/signup" variant="outlined" sx={{ mb: 2 }}>Sign up</Button>
      <Typography variant="h3" gutterBottom>New arrivals</Typography>
      {/* TODO: Maybe some filters as well? */}
      {/* --- SORTING -- */}
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 1, mr: 2, gap: 1 }}
      >
        {categories.map(category =>
          <Button key={category.id} onClick={() => changeSelectedCategory(category.id)}>{category.name}</Button>
        )}

        <select onChange={(e) => changeSize(e.target.value)}>
          <option>2</option>
          <option>4</option>
          <option>6</option>
          <option>8</option>
        </select>

        <Button 
          variant="contained"
          startIcon={<SortByAlphaIcon />} 
          onClick={() => changeSort("name,asc")}>
            A-Z
        </Button>
        <Button 
          variant="contained"
          startIcon={<AttachMoneyIcon />} 
          onClick={() => changeSort("price,desc")}>
            Desc
          {/* {sortNextPriceAsc // if yes, current is descending (high price first)
            ? <ArrowDownwardIcon fontSize="small" /> 
            : <ArrowUpwardIcon fontSize="small" />} */}
        </Button>
      </Box>
      <Grid container spacing={4} alignItems="stretch" mx={2} my={4}>
        {products.map((product) => (
          <Grid
            // Grid is divided into 12
            // 2, 3, or 3 items in a row depending on screen size. 
            size={{ xs: 12, sm: 6, md: 4 }}  
            sx={{ display: "flex", flexDirection: "column" }}
            key={product.id}
          >
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", textAlign: "center" }}>
              <CardActionArea component={RouterLink} to={`/product/${product.id}`} sx={{ flexGrow: 1 }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">{product.price}€</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                </CardContent>
              </CardActionArea>
              <Divider />
              <Button variant="contained" color="accent" sx={{ mt:"auto", py: 1.2 }} onClick={() => addToCart(product)}>
                Add to cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
      <span>{page + 1}</span>
      <Button disabled={page + 1 === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
      <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
    </Box>
  )
}
export default Home