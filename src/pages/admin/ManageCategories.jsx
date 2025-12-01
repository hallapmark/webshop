import { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import { toast, ToastContainer } from "react-toastify";

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
      fetch("http://localhost:8080/categories")
        .then(res => res.json())
        .then(json => setCategories(json))
  }, []);

  function addCategory() {
    const name = (newCategoryName || "").trim();
    if (!name) return;
    setCreating(true);

    fetch("http://localhost:8080/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(json => setCategories(json))
        // Backend returns the categories list
      .catch(err => 
        toast.error(`Failed to create category: ${err}`))
      .finally(() => {
        setCreating(false);
        setNewCategoryName("");
      });
  }

  return (
    <Box>
      <Typography variant="h1" sx={{ textAlign: "center", my: 1.5 }}>Manage Categories</Typography>
      <Typography variant="h5" sx={{ textAlign: "center", my: 1.5 }}>Add category</Typography>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Category name"
          value={newCategoryName}
          onChange={e => setNewCategoryName(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={addCategory} disabled={creating || !newCategoryName.trim()}>
          {creating ? 'Adding...' : 'Add'}
        </Button>
      </Box>
      <br />
      <Typography variant="h5" sx={{ textAlign: "center", my: 1.5 }}>All categories</Typography>
      {/* https://mui.com/material-ui/react-table/ */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category name</TableCell>
              <TableCell align="right">Category id</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category.id}
            >
              <TableCell component="th" scope="row">{category.name}</TableCell>
              <TableCell align="right">{category.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
    </Box>
  )
}
export default ManageCategories


// TODO: kodus
// siin samas teha ka ADD, selle sees. tabeli kohal väike ADD vorm lihtsalt. eraldi ADD lehte mitte teha

// list pole vaja
// change pole
// detail pole vaja