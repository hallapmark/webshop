import "@fontsource/roboto/300.css"; // Light
import "@fontsource/roboto/400.css"; // Regular
import "@fontsource/roboto/500.css"; // Medium
import "@fontsource/roboto/700.css"; // Bold

import { ThemeProvider } from "@mui/material/styles";
import travelTheme from "./theme";
import { Button, Card, CardContent, Typography, Stack, Box } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={travelTheme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", p: 4 }}>
        <Typography variant="h3" gutterBottom>
          WebShop Theme 
        </Typography>

        {/* Buttons */}
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
              This card uses the muted color background and shows text contrast.
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
    </ThemeProvider>
  );
}

export default App;
