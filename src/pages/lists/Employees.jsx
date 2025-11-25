import { useState } from 'react';
import { Link as RouterLink } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card'
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import employeesFile from '../../data/employees.json'
import { useTranslation } from 'react-i18next';

function Employees() {
  const [employees, setEmployees] = useState(employeesFile.slice());
  const { t } = useTranslation();
  
  return (
    <Box>
      <Typography variant="h1" sx={{mx: 3}}>{t('employees.employees')}</Typography>
      <Grid container spacing={4} alignItems="stretch" mx={2} my={4}>
        {employees.map((employee) => (
          <Grid 
            item
            size={{xs: 12, sm: 6, md: 4, lg: 3}}
            sx={{ display: "flex", flexDirection: "column"}}
            key={employee.id}
          >
            <Card sx={{ display: "flex", 
                        flexDirection: "column", 
                        height: "100%", 
                        borderTop: '4px solid', 
                        borderColor: 'accent.main', 
                        transition: 'transform .12s ease, box-shadow .12s ease', 
                        '&:hover': { transform: 'translateY(-4px)', boxShadow: 2 } }}>
              <CardActionArea component={RouterLink} to={`/employee/${employee.id}`} sx={{ flexGrow: 1 }}>
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
                <CardContent sx={{ textAlign: "center", flexGrow: 1}}>
                  <Typography variant="h5" >{employee.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Box sx={{ textAlign: "center", mt: 1.5 }}>
              <Typography variant="body2">{employee.email}</Typography>
              <Typography variant="body2">{employee.phone}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
export default Employees