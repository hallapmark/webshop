import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import shopsFile from "../../data/tallinn_shops.json"
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

function ChangeShop() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(shopsFile.find(item => item.id === id));

  const updateShop = () => {
    if (shop.name.length < 2) {
      toast.error("Shop name is too short!");
      return;
    }

    if (shop.address.length < 4) {
      toast.error("Check shop address!");
      return;
    }

    const index = shopsFile.findIndex((item) => item.id === id);
    shopsFile[index] = shop;

    navigate("/manage-shops");
  };

  if (shop === undefined) {
    return <Typography variant="h6">Shop not found</Typography>
  }

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center" }}>Edit Car</Typography>
      <TextField
        label="Name"
        value={shop.name}
        onChange={(e) => setShop({...shop, name: e.target.value })}
      />
      <TextField
        label="Telephone"
        type="number"
        value={shop.telephone}
        onChange={(e) => setShop({...shop, telephone: Number(e.target.value) })}
      />
      <TextField
        label="Address"
        value={shop.address}
        onChange={(e) => setShop({...shop, address: e.target.value })}
      />
      <Button variant="contained" onClick={updateShop}>Update</Button>
      <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
    </Box>
  );
}

export default ChangeShop
  