import { createSlice } from '@reduxjs/toolkit';
import { DefaultShopDto } from '../../data/dto/Shop/ShopDto';
import {
    receiveItemsReducer as receiveItems, deleteItemReducer as deleteItem,
    addFilterReducer as addFilter, removeFilterReducer as removeFilter,
    setSearchValue, setFilterReducer as setFilter, counterReducer as Counter
} from '../reducers/shopReducers'

const shopSlice = createSlice({
    name: "_shop",
    initialState: DefaultShopDto,
    reducers: {
        receiveItems,
        deleteItem,
        addFilter,
        removeFilter,
        setSearchValue,
        setFilter,
        Counter
    }
})

const shopActions = shopSlice.actions;

export { shopSlice, shopActions }