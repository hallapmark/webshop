import "@fontsource/roboto/300.css"; // Light
import "@fontsource/roboto/400.css"; // Regular
import "@fontsource/roboto/500.css"; // Medium
import "@fontsource/roboto/700.css"; // Bold

import { ThemeProvider } from "@mui/material/styles";
import travelTheme from "./theme";
import TopNav from "./components/TopNav";
import { Route, Routes } from "react-router-dom";
import CarsPLP from "./pages/lists/CarsPLP";
import Home from "./pages/Home";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={travelTheme}>
      {/* see https://mui.com/material-ui/react-css-baseline/ */}
      <CssBaseline />
      <TopNav />
      
      <Routes>
        <Route path="/cars" element={<CarsPLP />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
