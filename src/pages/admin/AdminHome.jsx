import { Link as RouterLink } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function AdminHome() {
  const cards = [
    { to: '/manage-shops', title: 'Manage Shops' },
    { to: '/manage-users', title: 'Manage Users' },
    { to: '/manage-employees', title: 'Manage Employees' },
    { to: '/manage-products', title: 'Manage Products' },
    { to: '/manage-categories', title: 'Manage Categories' },
  ];

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>Admin</Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">Choose an administration area to manage.</Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gridAutoRows: '1fr',
        }}
      >
        {cards.map((c) => (
          <Box key={c.to} sx={{ display: 'flex' }}>
            <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{c.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Manage {c.title.replace('Manage ', '').toLowerCase()} records and settings.
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={RouterLink} to={c.to} size="small">Open</Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  )
}

export default AdminHome