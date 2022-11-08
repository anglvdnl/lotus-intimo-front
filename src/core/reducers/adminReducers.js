import { AdminItemData, AdminUpdateItemData } from "../../data/dto/AdminProps/AdminPropsDto";

const setAdminReducer = (state, action) => {
    state.isAdmin = action.payload;
}

const setAddItemValue = (state, action) => {
    const pair = action.payload;
    state.addItemData[pair.key] = pair.value;
}

const addItemStockData = (state) => {
    state.addItemData.stockData.push({
        size: "",
        color: "",
        code: "",
        price: 0
    });
}

const removeItemStockData = (state, action) => {
    state.addItemData.stockData.splice(action.payload);
}

const setItemStockDataColor = (state, action) => {
    const pair = action.payload;
    state.addItemData.stockData[pair.index].color = pair.value;
}

const setItemStockDataSize = (state, action) => {
    const pair = action.payload;
    state.addItemData.stockData[pair.index].size = pair.value;
}

const setItemStockDataCode = (state, action) => {
    const pair = action.payload;
    state.addItemData.stockData[pair.index].code = pair.value;
}

const setItemStockDataPrice = (state, action) => {
    const pair = action.payload;
    state.addItemData.stockData[pair.index].price = pair.value === "" ? 0 : pair.value;
}

const resetAddItem = (state) => {
    state.addItemData = AdminItemData;
}

const setModalShopItem = (state, action) => {
    state.updateItemData.shopItem = action.payload;

    state.updateItemData.data.name = action.payload.name;
    state.updateItemData.data.price = action.payload.price;
    state.updateItemData.data.brand = action.payload.brand;
    state.updateItemData.data.description = action.payload.description;
    state.updateItemData.data.category = action.payload.category;
    state.updateItemData.data.subCategory = action.payload.subCategory;
    state.updateItemData.data.discount = action.payload.discount;
    state.updateItemData.data.novelty = action.payload.novelty;
    state.updateItemData.data.heat = action.payload.heat;
    state.updateItemData.data.composition = action.payload.composition
    state.updateItemData.data.stockData = [];
    state.updateItemData.data.images = [];

    for (let i = 0; i < action.payload.stockData.length; i++) {
        const element = action.payload.stockData[i];
        state.updateItemData.data.stockData.push({
            size: element.size,
            color: element.color,
            code: element.code,
            price: element.price.toString()
        })
    }

    for (let i = 0; i < action.payload.images.length; i++) {
        const element = action.payload.images[i];
        state.updateItemData.data.images.push(element);
    }
}

const setUpdateItemValue = (state, action) => {
    const pair = action.payload;
    state.updateItemData.data[pair.key] = pair.value;
}

const resetUpdateItemData = (state) => {
    state.updateItemData = AdminUpdateItemData;
}

const addUpdateStockData = (state) => {
    state.updateItemData.data.stockData.push({
        size: "",
        color: "",
        code: "",
        price: 0
    });
}

const removeUpdateStockData = (state, action) => {
    state.updateItemData.data.stockData.splice(action.payload);
}

const setUpdateStockDataColor = (state, action) => {
    const pair = action.payload;
    state.updateItemData.data.stockData[pair.index].color = pair.value;
}

const setUpdateStockDataSize = (state, action) => {
    const pair = action.payload;
    state.updateItemData.data.stockData[pair.index].size = pair.value;
}

const setUpdateStockDataCode = (state, action) => {
    const pair = action.payload;
    state.updateItemData.data.stockData[pair.index].code = pair.value;
}

const setUpdateStockDataPrice = (state, action) => {
    const pair = action.payload;
    state.updateItemData.data.stockData[pair.index].price = pair.value === "" ? 0 : pair.value;
}

const setSearchValue = (state, action) => {
    state.searchValue = action.payload;
}

export {
    setAdminReducer, setAddItemValue, setItemStockDataColor, setItemStockDataSize, setItemStockDataCode, setItemStockDataPrice, resetAddItem,
    addItemStockData, removeItemStockData, setModalShopItem, setUpdateItemValue, resetUpdateItemData, addUpdateStockData, removeUpdateStockData,
    setUpdateStockDataColor, setUpdateStockDataSize, setUpdateStockDataCode, setUpdateStockDataPrice, setSearchValue
}