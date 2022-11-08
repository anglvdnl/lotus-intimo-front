import { createSlice } from '@reduxjs/toolkit';
import { DefaltAdminPropsDto } from '../../data/dto/AdminProps/AdminPropsDto'
import { setAdminReducer as setAdmin, setItemStockDataColor, setItemStockDataSize, 
    setItemStockDataCode, setItemStockDataPrice, resetAddItem, addItemStockData, 
    setAddItemValue, setUpdateItemValue, resetUpdateItemData, removeItemStockData,
    setModalShopItem, addUpdateStockData, removeUpdateStockData, setUpdateStockDataColor, 
    setUpdateStockDataSize, setUpdateStockDataCode, setUpdateStockDataPrice, setSearchValue } from '../reducers/adminReducers';

const adminSlice = createSlice({
    name: "_admin",
    initialState: DefaltAdminPropsDto,
    reducers: {
        setAdmin,
        setItemStockDataColor,
        setItemStockDataSize,
        setItemStockDataCode, 
        setItemStockDataPrice, 
        resetAddItem,
        addItemStockData,
        removeItemStockData,
        setAddItemValue,
        setUpdateItemValue,
        resetUpdateItemData,
        setModalShopItem,
        addUpdateStockData,
        removeUpdateStockData,
        setUpdateStockDataColor, 
        setUpdateStockDataSize,
        setUpdateStockDataCode,
        setUpdateStockDataPrice,
        setSearchValue
    }
})

const adminActions = adminSlice.actions;

export { adminSlice, adminActions }