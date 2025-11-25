
// react, react router
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// constants 
import { LNG_KEY, LANGUAGE_MANUALLY_SET_KEY } from "./i18n";

// pages
import TopNav from "./components/TopNav";
import Home from "./pages/Home";
import CarsPLP from "./pages/lists/CarsPLP";
import NotFound from "./pages/NotFound"

// mui and fonts
import "@fontsource/roboto/300.css"; // Light
import "@fontsource/roboto/400.css"; // Regular
import "@fontsource/roboto/500.css"; // Medium
import "@fontsource/roboto/700.css"; // Bold
import { ThemeProvider } from "@mui/material/styles";
import travelTheme from "./theme";
import CssBaseline from '@mui/material/CssBaseline';
import Cart from "./pages/Cart";
import ManageCars from "./pages/manage/ManageCars";
import ManageEmployees from "./pages/manage/ManageEmployees";
import ManageProducts from "./pages/manage/ManageProducts";
import ManageShops from "./pages/manage/ManageShops";
import ManageUsers from "./pages/manage/ManageUsers";
import Employees from "./pages/lists/Employees";
import Users from "./pages/lists/Users";
import Shops from "./pages/lists/Shops";
import ChangeCar from "./pages/change/ChangeCar";
import ChangeEmployee from "./pages/change/ChangeEmployee";
import ChangeShop from "./pages/change/ChangeShop";
import ChangeUser from "./pages/change/ChangeUser";
import ChangeProduct from "./pages/change/ChangeProduct";
import { useTranslation } from "react-i18next";
import CarDetail from "./pages/detail/CarDetail";
import EmployeeDetail from "./pages/detail/EmployeeDetail";
import ShopDetail from "./pages/detail/ShopDetail";
import UserDetail from "./pages/detail/UserDetail";
import PDP from "./pages/detail/PDP";


function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem(LANGUAGE_MANUALLY_SET_KEY) === "true") {
      return;
    }

    let detectedLang = navigator.language;
    if (detectedLang.toLowerCase().includes("en-")) {
      detectedLang = "en" // Simplify English-language locales to one catch-all English-language locale
    }
    i18n.changeLanguage(detectedLang);
    localStorage.setItem(LNG_KEY, detectedLang);
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []) // eslint wants i18n reported as a dep, but i18n is stable and we only want to run the effect once.
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
        <Route path="/shops" element={<Shops />} />
        <Route path="/users" element={<Users />} />

        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/employee/:id" element={<EmployeeDetail />} />
        <Route path="/product/:id" element={<PDP />} />
        <Route path="/shop/:id" element={<ShopDetail />} />
        <Route path="/user/:id" element={<UserDetail />} />

        <Route path="/manage-cars" element={<ManageCars />} />
        <Route path="/manage-employees" element={<ManageEmployees />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/manage-shops" element={<ManageShops />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/change-car/:id" element={<ChangeCar />} />
        <Route path="/change-employee/:id" element={<ChangeEmployee />} />
        <Route path="/change-product/:id" element={<ChangeProduct />} />
        <Route path="/change-shop/:id" element={<ChangeShop />} />
        <Route path="/change-user/:id" element={<ChangeUser />} />

        <Route path="/cart" element={<Cart />} />
        
        <Route path="/*" element={ <NotFound /> } />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
