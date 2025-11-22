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

function App() {
  return (
    <ThemeProvider theme={travelTheme}>
      <TopNav />
      
      <Routes>
        <Route path="/cars" element={<CarsPLP />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
