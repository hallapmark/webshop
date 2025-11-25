import { useNavigate, useParams } from "react-router-dom"
import employeesFile from "../../data/employees.json"

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const found = employeesFile.find(employee => employee.id === id);

  if (found === undefined) {
    return <Typography variant="h6">Employee not found</Typography>
  }

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", textAlign: "center" }}>
      <CardMedia
        component="img"
        image={`/src/assets/${found.image}`}
        alt="Employee"
        sx={{
          maxHeight: 140,
          objectFit: "contain", // maintain aspect ratio
          mx: "auto",           // center horizontally
          mt: 2
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{found.name}</Typography>
        <Typography variant="body2">{found.email}</Typography>
        <Typography variant="body2">{found.phone}</Typography>
        <Button sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Back
        </Button>
      </CardContent>
    </Card>
  )
}

export default EmployeeDetail