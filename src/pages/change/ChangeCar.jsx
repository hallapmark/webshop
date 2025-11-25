import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import carsFile from "../../data/cars.json"
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

function ChangeCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(carsFile.find(item => item.id === id));

  const updateCar = () => {
    if (car.price <= 0) {
      toast.error("Price cannot be zero or negative");
      return;
    }

    if (car.name.length < 2) {
      toast.error("Car name is too short!");
      return;
    }

    const index = carsFile.findIndex((item) => item.id === id);
    carsFile[index] = car;

    navigate("/manage-cars");
  };

  if (car === undefined) {
    return <Typography variant="h6">Car not found</Typography>
  }

  return (
    <Box
      sx={{
        maxWidth: 300,
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
        value={car.name}
        onChange={(e) => setCar({...car, name: e.target.value })}
      />
      <TextField
        label="Price (EUR)"
        type="number"
        value={car.price}
        onChange={(e) => setCar({...car, price: Number(e.target.value) })}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={car.active}
            onChange={(e) => setCar({...car, active: e.target.checked })}
          />
        }
        label="Active"
      />
      <TextField
        label="Image"
        value={car.image}
        onChange={(e) => setCar({ ...car, image: e.target.value })}
      />
      <Button variant="contained" onClick={updateCar}>Update</Button>
      <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
    </Box>
  );
}

export default ChangeCar
  