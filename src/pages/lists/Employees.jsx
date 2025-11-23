import Box from '@mui/material/Box';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useState } from 'react';
import employeesFile from '../../data/employees.json'

function Employees() {
  const [employees, setEmployees] = useState(employeesFile.slice());
  
  return (
    <Grid container spacing={4} mx={2} my={4}>
      {employees.map((employee) => (
        <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={employee.id}>
          <Card>
            <CardMedia
              component="img"
              image={`src/assets/${employee.image}`}
              alt="Employee"
              sx={{
                maxHeight: 140,
                objectFit: "contain", // maintain aspect ratio
                mx: "auto",           // center horizontally
                mt: 2
              }}
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5" >{employee.name}</Typography>
            </CardContent>
          </Card>
          <Box sx={{ textAlign: "center", mt: 1.5 }}>
            <Typography variant="body2">{employee.email}</Typography>
            <Typography variant="body2">{employee.phone}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
export default Employees