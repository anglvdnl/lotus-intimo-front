import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { adminSlice } from "../slices/adminSlice";
import { authSlice } from "../slices/authSlice"
import { cartSlice } from "../slices/cartSlice";
import { favSlice } from "../slices/favSlice";
import { shopSlice } from "../slices/shopSlice";

const rootReducer = combineReducers({
    _auth: authSlice.reducer,
    _cart: cartSlice.reducer,
    _shop: shopSlice.reducer,
    _admin: adminSlice.reducer,
    _fav: favSlice.reducer
});

const reduxStore = configureStore({ reducer: rootReducer });

export default reduxStore;