import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useState } from 'react';
import employeesFile from '../../data/employees.json'

function Employees() {
  const [employees, setEmployees] = useState(employeesFile.slice());
  
  return (
    <Grid container spacing={3} margin={2}>
      {employees.map((employee) => (
        <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={employee.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{employee.name}</Typography>
              <Typography variant="body2">{employee.email}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
export default Employees