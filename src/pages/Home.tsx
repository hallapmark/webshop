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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Euro from "@mui/icons-material/Euro";
import type { Product } from "../models/Product";
import type { Category } from "../models/Category";
import AddCartButton from "../components/AddCartButton";

import useEffectFetch from "../hooks/useEffectFetch";
import placeholder from "../assets/placeholder.webp";

function ProductImage({ src, alt }: { src: string | null, alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Box sx={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}>
      <Box
        component="img"
        src={placeholder}
        alt={alt}
        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {src && !error && (
        <Box
          component="img"
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 200ms ease-in',
          }}
        />
      )}
    </Box>
  );
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]); 
  // const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [sortField, setSortField] = useState<"id"|"name"|"price">("id");
  const [sortDir, setSortDir] = useState<"asc"|"desc">("asc");
  const categories = useEffectFetch("/categories", "Failed to fetch categories") as Category[];

  // useEffect(() => {
  //   fetch(import.meta.env.VITE_BACKEND_URL + "/categories")
  //     .then(res => res.json())
  //     .then(json => {
  //       setCategories(json);
  //     })
  // }, []);

  useEffect(() => {
    const sortParam = `${sortField},${sortDir}`;
    fetch(import.meta.env.VITE_BACKEND_URL + `/products?size=${size}&page=${page}&categoryId=${selectedCategory}&sort=${sortParam}`)
      .then(res => res.json())
      .then(json => {
        setProducts(json.content)
        setTotalPages(json.totalPages)
      })
  }, [page, size, selectedCategory, sortField, sortDir]);
  // filtreerimised pigem backendis teha. isegi sorteerimisi tehakse tihti backendis (TODO!)
  // lehekylgede kaupa võiks ka olla lõpuks

  function changeSize(newValue: number) {
    setSize(newValue);
    setPage(0);
  }

  function changeSelectedCategory(newValue: number) {
    setSelectedCategory(newValue);
    setPage(0);
  }

  function toggleSort(field: "name" | "price") {
    if (sortField === field) {
      setSortDir(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      // Default direction: asc for all fields
      setSortDir("asc");
    }
    setPage(0);
  }

  return (
    <Box sx={{ m: { xs: 1, sm: 2, md: 4 } }}>
      <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>Demo Webshop</Typography>
      <br />
      <Typography variant="h3" gutterBottom sx={{ fontSize: { xs: '1.125rem', sm: '1.5rem' } }}>New arrivals</Typography>
      {/* TODO: Maybe some filters as well? */}
      {/* --- CATEGORIES --- */}
      <Box sx={{ display: "flex", flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'center' }, mt: 1, gap: { xs: 1, sm: 2 } }}>
        {/* Scrollable categories */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            flexWrap: "nowrap",
            gap: 1,
            pr: { xs: 1, md: 2 },
            mr: { xs: 1, md: 2 },
            position: "relative",
            // add a fade on the right edge (20px) for md and below so partially-hidden items appear faded
            WebkitMaskImage: { xs: "linear-gradient(to right, black 0 calc(100% - 20px), transparent 100%)", md: "none" },
            maskImage: { xs: "linear-gradient(to right, black 0 calc(100% - 20px), transparent 100%)", md: "none" },
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            scrollbarColor: "text.secondary muted.main", // firefox and 2025+ chrome, edge, safari
            "&::-webkit-scrollbar": { height: 8 }, // <- old chrome, edge, safari ->
            "&::-webkit-scrollbar-track": { backgroundColor: "muted.main" },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "text.secondary", borderRadius: 1 },
            width: { xs: '100%', sm: 'auto' }
          }}
        >
          {categories.map(category =>
            <Button
              key={category.id}
              onClick={() => changeSelectedCategory(category.id)}
              sx={{ flexShrink: 0, fontSize: { xs: '0.75rem', md: "0.8125rem" } }}
            >
              {category.name}
            </Button>
          )}
        </Box>

        {/* Controls (kept as a single horizontal unit on xs, but allowed to wrap on md to avoid overflow) */}
        <Box sx={{ display: "flex", width: { xs: '100%', sm: 'auto' }, flexWrap: { xs: 'nowrap', sm: 'nowrap', md: 'wrap' }, overflowX: { xs: 'auto', sm: 'visible' }, justifyContent: { xs: 'center', sm: 'flex-end' }, alignItems: "center", mt: { xs: 1, md: 1 }, mr: { xs: 0, md: 2 }, gap: 1 }}>
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', minWidth: 40, mr: { xs: 1 } }}>
            <select onChange={(e) => changeSize(Number(e.target.value))} value={size}>
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={8}>8</option>
            </select>
          </Box>

          <Button
            variant={sortField === "name" ? "contained" : "outlined"}
            startIcon={<SortByAlphaIcon />}
            title="Sort by name"
            aria-pressed={sortField === "name"}
            aria-label={sortField === "name" ? `Sort by name, ${sortDir === 'asc' ? 'ascending' : 'descending'}` : 'Sort by name'}
            onClick={() => toggleSort("name")}
            sx={{ minWidth: { xs: 40, sm: 48 }, minHeight: 36, px: 1 }}
          >
            {sortField === "name"
              ? (sortDir === "asc" ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)
              : <ArrowDownwardIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            }
          </Button>

          <Button
            variant={sortField === "price" ? "contained" : "outlined"}
            startIcon={<Euro />}
            title="Sort by price"
            aria-pressed={sortField === "price"}
            aria-label={sortField === "price" ? `Sort by price, ${sortDir === 'asc' ? 'ascending' : 'descending'}` : 'Sort by price'}
            onClick={() => toggleSort("price")}
            sx={{ minWidth: { xs: 40, sm: 48 }, minHeight: 36, px: 1 }}
          >
            {sortField === "price"
              ? (sortDir === "asc" ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)
              : <ArrowDownwardIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            }
          </Button>
        </Box>
      </Box>
      <Grid container spacing={4} alignItems="stretch" sx={{ mx: { xs: 0, sm: 2 }, my: 4 }}>
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
                <Box sx={{ width: '100%', px: 4, pt: 4 }}>
                  <ProductImage src={product.imageUrl} alt={product.name} />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">{product.price}€</Typography>
                  <Typography variant="body2">{product.description_en}</Typography>
                </CardContent>
              </CardActionArea>
              <Divider />
              <AddCartButton addedProduct={product} fullWidth />
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
      <span>{page + 1}</span>
      <Button disabled={page + 1 === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
    </Box>
  )
}
export default Home