// src/theme.js
import { createTheme } from "@mui/material/styles";

// colors from ai
const travelTheme = createTheme({
  palette: {
    mode: "light", // default; will respect system dark mode later
    primary: {
      main: "#3b82f6",        // Modern Travel Blue primary
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#dbeafe",        // light secondary
      contrastText: "#153243", 
    },
    accent: {
      main: "#facc15",        // accent yellow
      contrastText: "#0f172a",
    },
    muted: {
      main: "#f0f9ff",        // muted card background
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
  },
});

export default travelTheme;
