import axios from "axios";
import { ShopItemDto } from "../../data/dto/Shop/ShopItemDto";
import { filterTypes } from "../../data/utils/filterTypes";
import { serverApiPath } from "../../data/utils/serverApiPaths";

const receiveItemsReducer = (state, action) => {
    const receivedItems = action.payload;
    const shopItems = [];

    for (let i = 0; i < receivedItems.length; i++) {
        const shopItem = ShopItemDto(receivedItems[i].id, receivedItems[i].name, receivedItems[i].price,
            receivedItems[i].brand, receivedItems[i].description, receivedItems[i].category,
            receivedItems[i].subCategory, receivedItems[i].discount, receivedItems[i].stockData,
            receivedItems[i].novelty, receivedItems[i].heat, receivedItems[i].images, receivedItems[i].composition);

        shopItems.push(shopItem);
    }

    state.items = shopItems;
    state.filteredItems = shopItems;

    console.log('Shop items received:')
    console.log(shopItems)
}

const deleteItemReducer = (state, action) => {
    const itemToDeleteId = action.payload;

    axios.delete(serverApiPath.deleteShopItem + itemToDeleteId)
        .then(response => console.log(response.data ? "Item deleted!" : "Item delete fail."))
        .catch(error => console.log(error.message));

    for (let i = 0; i < state.items.length; i++) {
        const element = state.items[i];

        if (element.id === itemToDeleteId) {
            state.items.splice(i, 1);
            break;
        }
    }
}

const counterReducer = (state, action) => {
    console.log(action.payload, state.itemsToBuyCounter)
    switch (action.payload) {
        case "increment":
            console.log("increment")
            state.itemsToBuyCounter++;
            break;
        case "decrement":
            console.log("decrement")
            state.itemsToBuyCounter--;
            break;
    }

    if (state.itemsToBuyCounter < 1) {
        state.itemsToBuyCounter = 1
    }
}

const addFilterReducer = (state, action) => {
    const valuePair = action.payload;

    if (!state.filters.some(x => x.filterName === valuePair.filterName)) {
        state.filters.push({ filterName: valuePair.filterName, values: [valuePair.value] });
    } else if (!containsInFilter(state.filters, valuePair.filterName, valuePair.value)) {
        state.filters.find(x => x.filterName === valuePair.filterName).values.push(valuePair.value);
    }

    filterItems(state);
}

const setFilterReducer = (state, action) => {
    const valuePair = action.payload;

    if (!state.filters.some(x => x.filterName === valuePair.filterName)) {
        state.filters.push({ filterName: valuePair.filterName, values: [valuePair.value] });
    } else if (!containsInFilter(state.filters, valuePair.filterName, valuePair.value)) {
        state.filters.find(x => x.filterName === valuePair.filterName).values[0] = valuePair.value;
    }

    filterItems(state);
}

const removeFilterReducer = (state, action) => {
    const valuePair = action.payload;
    const concreteFilterValues = getFilterValues(state.filters, valuePair.filterName);

    if (concreteFilterValues.includes(valuePair.value)) {
        let index = concreteFilterValues.indexOf(valuePair.value);

        if (index > -1) {
            concreteFilterValues.splice(index, 1);
            filterItems(state);
        }
    }
}

const setSearchValue = (state, action) => {
    state.searchValue = action.payload;
    filterItems(state);
}

const filterItems = (state) => {
    state.filteredItems = state.items.filter(item => {
        const isFilteredBySearch = () => item.name.toLowerCase().includes(state.searchValue.toLowerCase());
        const isFilteredByBrand = () => isFiltered(state.filters, filterTypes.brand, item.brand);
        const isFilteredByNovelty = () => isFiltered(state.filters, filterTypes.novelty, item.novelty);
        const isFilteredByHeat = () => isFiltered(state.filters, filterTypes.heat, item.heat);
        const isFilteredByDiscount = () => isFiltered(state.filters, filterTypes.discount, item.isOnDiscount);

        const isFilteredByPrice = () => (isFilterEmpty(state.filters, filterTypes.minPrice) || item.stockData.some(x => parseFloat(x.price - x.price * item.discount / 100) >= parseFloat(getFilterValues(state.filters, filterTypes.minPrice))))
            && (isFilterEmpty(state.filters, filterTypes.maxPrice) || item.stockData.some(x => parseFloat(x.price - x.price * item.discount / 100) <= parseFloat(getFilterValues(state.filters, filterTypes.maxPrice))));

        const isFilteredByCategory = () => isFiltered(state.filters, filterTypes.womanCategory, item.subCategory) &&
            isFiltered(state.filters, filterTypes.manCategory, item.subCategory) &&
            isFiltered(state.filters, filterTypes.kidsCategory, item.subCategory) &&
            isFiltered(state.filters, filterTypes.certifsCategory, item.subCategory);

        const isFilteredByStockData = () => {
            const isColored = isFilterEmpty(state.filters, filterTypes.color)
                || item.stockData.some(x => getFilterValues(state.filters, filterTypes.color).includes(x.color));
            const isSized = isFilterEmpty(state.filters, filterTypes.size)
                || item.stockData.some(x => getFilterValues(state.filters, filterTypes.size).includes(x.size));

            return isColored && isSized;
        }

        return isFilteredBySearch() && isFilteredByCategory() && isFilteredByStockData()
            && isFilteredByBrand() && isFilteredByNovelty() && isFilteredByHeat()
            && isFilteredByDiscount() && isFilteredByPrice();
    })
}

const isFiltered = (filters, filterName, value) => isFilterEmpty(filters, filterName) || containsInFilter(filters, filterName, value);
const isFilterEmpty = (filters, filterName) => !getFilterValues(filters, filterName).length;
const containsInFilter = (filters, filterName, value) => getFilterValues(filters, filterName).includes(value);

const getFilterValues = (filters, filterName) => {
    const filter = filters.find(x => x.filterName === filterName);
    return filter ? filter.values : [];
};

export { receiveItemsReducer, deleteItemReducer, addFilterReducer, removeFilterReducer, containsInFilter, setSearchValue, setFilterReducer, counterReducer };