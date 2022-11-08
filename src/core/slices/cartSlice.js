import { createSlice } from '@reduxjs/toolkit';
import { DefaultCartDto } from '../../data/dto/Cart/CartDto';
import {
    addItemReducer as addItem, removeItemReducer as removeItem,
    setCartReducer as setCart, combineCartsReducer as combineCarts,
    handleCounterReducer as handleCounter, updateItemCodeReducer as updateItemCode
} from "../reducers/cartReducers"

const cartSlice = createSlice({
    name: "_cart",
    initialState: DefaultCartDto,
    reducers: {
        addItem,
        removeItem,
        setCart,
        combineCarts,
        handleCounter,
        updateItemCode
    }
})

const cartActions = cartSlice.actions;

export { cartSlice, cartActions }