import travelTheme from "../theme"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

function Home() {
  return (
    <Box m={4}>
      <Typography variant="h3" gutterBottom>
        WebShop Theme 
      </Typography>

      {/* mb means margin-bottom in mui-units. *8px. so mb: 4 is 32px */}
      <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
        <Button variant="contained" color="primary">Primary</Button>
        <Button variant="contained" color="secondary">Secondary</Button>
        <Button
          variant="contained"
          sx={{ bgcolor: travelTheme.palette.accent.main, color: travelTheme.palette.accent.contrastText }}
        >
          Accent
        </Button>
      </Stack>

      {/* Card */}
      <Card sx={{ bgcolor: travelTheme.palette.muted.main, color: travelTheme.palette.muted.contrastText, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Card Title
          </Typography>
          <Typography>
            Card with muted color background.
          </Typography>
        </CardContent>
      </Card>

      {/* Inline text samples */}
      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Typography sx={{ bgcolor: "background.default", p: 1 }}>Background</Typography>
        <Typography sx={{ color: "text.primary", p: 1 }}>Foreground</Typography>
        <Typography sx={{ color: "primary.main", p: 1 }}>Primary</Typography>
        <Typography sx={{ color: "secondary.main", p: 1 }}>Secondary</Typography>
        <Typography sx={{ color: travelTheme.palette.accent.main, p: 1 }}>Accent</Typography>
      </Stack>
    </Box>
  )
}
export default Home