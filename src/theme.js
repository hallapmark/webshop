import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Detect system dark mode preference
const prefersDarkMode = window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

let travelTheme = createTheme({
  typography: {
    h1: {
      fontSize: "4rem",   // reduce a bit
    },
  },
  palette: {
    mode: prefersDarkMode ? 'dark' : 'light',

    // Light palette
    ...(prefersDarkMode
      ? { // Dark mode overrides
          primary: {
            main: "#3b82f6",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#9ca3af",
            contrastText: "#f0f9ff",
          },
          accent: {
            main: "#facc15",
            contrastText: "#0f172a",
          },
          muted: {
            main: "#1f2937",
            contrastText: "#e5e7eb",
          },
          background: {
            default: "#1e293b",
            paper: "#1f2937",
          },
          text: {
            primary: "#f9fafb",
            secondary: "#d1d5db",
          },
        }
      : { // Light mode defaults
          primary: {
            main: "#3b82f6",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#dbeafe",
            contrastText: "#153243",
          },
          accent: {
            main: "#facc15",
            contrastText: "#0f172a",
          },
          muted: {
            main: "#f0f9ff",
            contrastText: "#1e293b",
          },
          background: {
            default: "#ffffff",
            paper: "#f0f9ff",
          },
          text: {
            primary: "#1e293b",
            secondary: "#64748b",
          },
        }),
  },
});
travelTheme = responsiveFontSizes(travelTheme);

export default travelTheme;
