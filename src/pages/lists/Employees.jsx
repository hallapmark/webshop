import { useState } from 'react';
import { Link as RouterLink } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Card from '@mui/material/Card'
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import employeesFile from '../../data/employees.json'
import { useTranslation } from 'react-i18next';

function Employees() {
  const [employees, setEmployees] = useState(employeesFile.slice());
  const [sortNextFirstNameAZAsc, setSortNextFirstNameAZAsc] = useState(true);
  const [sortNextLastNameAZAsc, setSortNextLastNameAZAsc] = useState(true);
  const [lastSort, setLastSort] = useState(null); // 'first' | 'last' | null 
  // Muidu ei saa kiiresti aru mis sort on aktiivne

  const { t } = useTranslation();

  function sortFirstNameAZ() {
    const sorted = employees.toSorted((a, b) =>
      sortNextFirstNameAZAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setEmployees(sorted);
    setSortNextFirstNameAZAsc(!sortNextFirstNameAZAsc); 
    setLastSort('first');
  }

  function sortLastNameAZ() {
    const sorted = employees.toSorted((a, b) =>
      sortNextLastNameAZAsc 
      ? getLastName(a.name).localeCompare(getLastName(b.name)) 
      : getLastName(b.name).localeCompare(getLastName(a.name))
    );
    setEmployees(sorted);
    setSortNextLastNameAZAsc(!sortNextLastNameAZAsc); 
    setLastSort('last');
  }

  function getLastName(name) {
    return name.split(" ").slice(-1)[0];
  }

  
  return (
    <Box>
      <Typography variant="h1" sx={{mx: 3}}>{t('employees.employees')}</Typography>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 1, mr: 2, gap: 1 }}
      >
        <Button 
          variant={lastSort === "first" ? "contained" : "outlined" }
          startIcon={<SortByAlphaIcon />} 
          onClick={sortFirstNameAZ}>
        First name
          {sortNextFirstNameAZAsc // if yes, we are CURRENTLY ZA
            ? <ArrowDownwardIcon fontSize="small" /> 
            : <ArrowUpwardIcon fontSize="small" />}
        </Button>
        <Button 
          variant={lastSort === "last" ? "contained" : "outlined" }
          startIcon={<SortByAlphaIcon />} 
          onClick={sortLastNameAZ}>
        Last name
          {sortNextLastNameAZAsc // if yes, we are CURRENTLY ZA
            ? <ArrowDownwardIcon fontSize="small" /> 
            : <ArrowUpwardIcon fontSize="small" />}
        </Button>
      </Box>
      <Grid container spacing={4} alignItems="stretch" mx={2} my={4}>
        {employees.map((employee) => (
          <Grid 
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