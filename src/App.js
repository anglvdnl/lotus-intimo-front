import { useEffect, useState } from "react";
import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/pages/HomePage";
import AuthPage from "./components/pages/AuthPage";
import ShopPage from "./components/pages/ShopPage";
import CartPage from "./components/pages/CartPage";
import AdminPage from "./components/pages/AdminPage";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { storageKeys } from "./data/utils/storageKeys";
import { authActions } from "./core/slices/authSlice";
import { cartActions } from "./core/slices/cartSlice";
import { serverApiPath } from "./data/utils/serverApiPaths";
import { shopActions } from "./core/slices/shopSlice";
import axios from "axios";
import PageNotFound from "./components/pages/PageNotFound";
import ItemPage from "./components/pages/ItemPage";
import ScrollToTop from "./data/utils/ScrollToTop";
import AdminItemModal from "./components/admin/AdminItemModal";
import OrderPage from "./components/pages/OrderPage";

function App() {
  const dispatch = useDispatch();
  const localUser = localStorage.getItem(storageKeys.user);
  const localCart = localStorage.getItem(storageKeys.cart);

  const [render, setRender] = useState(false)

  if (!render) {
    if (localUser) {
      dispatch(authActions.login(JSON.parse(localUser)));
    }

    if (localCart) {
      dispatch(cartActions.setCart(JSON.parse(localCart)));
    }

    axios.get(serverApiPath.getShopItems)
      .then(response => { dispatch(shopActions.receiveItems(response.data)); setRender(true) })
      .catch(error => console.log(`${serverApiPath.getShopItems} | ERROR: ${error.message}`));
  }

  //RENDERING
  if (render) {
    return (
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navbar />}>
            {/* <Route index element={<HomePage />} /> */}
            <Route index element={<Navigate to="/shop" replace />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="shop/:name/:id" element={<ItemPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="admin/:id" element={<AdminItemModal />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="cart/order" element={<OrderPage />} />
          </Route>
        </Routes>
      </Router >
    )
  }
  return null;
}

export default App;
