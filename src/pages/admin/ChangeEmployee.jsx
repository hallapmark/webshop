import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import employeesFile from "../../data/employees.json"
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

function ChangeEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(employeesFile.find(item => item.id === id));

  const update = () => {
    if (employee.name.length < 2) {
      toast.error("The name is too short!");
      return;
    }
    if (employee.email.length < 7) {
      toast.error("The employee email is too short");
      return;
    }
    if (!(employee.email.includes("@"))) {
      toast.error("The employee email has an incorrect format");
      return;
      }
    const index = employeesFile.findIndex((item) => item.id === id);
    employeesFile[index] = employee;
    navigate("/manage-employees");
  };

  if (employee === undefined) {
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
      <Typography variant="h5" sx={{ textAlign: "center" }}>Edit Employee</Typography>
      <TextField
        label="Name"
        value={employee.name}
        onChange={(e) => setEmployee({...employee, name: e.target.value })}
      />
      <TextField
        label="Email"
        value={employee.email}
        onChange={(e) => setEmployee({...employee, email: e.target.value })}
      />
      <TextField
        label="Image"
        value={employee.image}
        onChange={(e) => setEmployee({...employee, image: e.target.value })}
      />
      <TextField
        label="Phone"
        value={employee.phone}
        onChange={(e) => setEmployee({...employee, phone: e.target.value })}
      />
      
      <Button variant="contained" onClick={update}>Update</Button>
      <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
    </Box>
  );
}

export default ChangeEmployee