import "@fontsource/roboto/300.css"; // Light
import "@fontsource/roboto/400.css"; // Regular
import "@fontsource/roboto/500.css"; // Medium
import "@fontsource/roboto/700.css"; // Bold

import { ThemeProvider } from "@mui/material/styles";
import travelTheme from "./theme";
import { Route, Routes } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';

import TopNav from "./components/TopNav";
import Home from "./pages/Home";
import CarsPLP from "./pages/lists/CarsPLP";
import NotFound from "./pages/NotFound"

import ManageCars from "./pages/manage/ManageCars";
import ManageEmployees from "./pages/manage/ManageEmployees";
import ManageProducts from "./pages/manage/ManageProducts";
import ManageShops from "./pages/manage/ManageShops";
import ManageUsers from "./pages/manage/ManageUsers";
import Employees from "./pages/lists/Employees";

function App() {
  return (
    <ThemeProvider theme={travelTheme}>
      {/* see https://mui.com/material-ui/react-css-baseline/ */}
      <CssBaseline />
      <TopNav />
      
      <Routes>
        <Route path="/cars" element={<CarsPLP />} />
        <Route path="/" element={<Home />} />

        <Route path="/cars" element={<CarsPLP />} />
        <Route path="/employees" element={<Employees />} />

        <Route path="/manage-cars" element={<ManageCars />} />
        <Route path="/manage-employees" element={<ManageEmployees />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/manage-shops" element={<ManageShops />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        
        <Route path="/*" element={ <NotFound /> } />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
