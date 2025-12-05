// react, react router
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

// constants 
import { LNG_KEY, LANGUAGE_MANUALLY_SET_KEY } from "./i18n";

// pages
import TopNav from "./components/TopNav";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound"
import Signup from "./pages/auth/Signup";

// mui and fonts
import "@fontsource/roboto/300.css"; // Light
import "@fontsource/roboto/400.css"; // Regular
import "@fontsource/roboto/500.css"; // Medium
import "@fontsource/roboto/700.css"; // Bold
import { ThemeProvider } from "@mui/material/styles";
import travelTheme from "./theme";
import CssBaseline from '@mui/material/CssBaseline';
import Cart from "./pages/Cart";
import Employees from "./pages/lists/Employees";
import Shops from "./pages/lists/Shops";
import ChangeEmployee from "./pages/admin/ChangeEmployee";
import ChangeShop from "./pages/admin/ChangeShop";
import ChangeUser from "./pages/admin/ChangeUser";
import { useTranslation } from "react-i18next";
import ShopDetail from "./pages/detail/ShopDetail";
import UserDetail from "./pages/detail/UserDetail";
import ProductDetail from "./pages/detail/ProductDetail";
import EditProduct from "./pages/admin/ChangeProduct";
import ManageEmployees from "./pages/admin/ManageEmployees";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageShops from "./pages/admin/ManageShops";
import AdminHome from "./pages/admin/AdminHome";
import ManageCategories from "./pages/admin/ManageCategories";

import Profile from "./pages/auth/Profile";
import Login from "./pages/auth/Login";
import RequireAuth from "./components/RequireAuth";
import RequireNotAuth from "./components/RequireNotAuth";



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
        <Route path="/" element={<Home />} />

        <Route path="/employees" element={<Employees />} />
        <Route path="/shops" element={<Shops />} />

        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/shop/:id" element={<ShopDetail />} />

        <Route path="/cart" element={<Cart />} />

        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:id" element={<UserDetail />} />

          <Route path="/manage-employees" element={<ManageEmployees />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/manage-shops" element={<ManageShops />} />
          <Route path="/manage-categories" element={<ManageCategories />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/change-employee/:id" element={<ChangeEmployee />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/change-shop/:id" element={<ChangeShop />} />
          <Route path="/change-user/:id" element={<ChangeUser />} />
        </Route>

        <Route element={<RequireNotAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
