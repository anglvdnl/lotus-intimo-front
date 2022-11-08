const ShopDto = (items, filteredItems, filters) => {
    return {
        items: items,
        filteredItems: filteredItems,
        filters: filters,
        searchValue: "",
        itemsToBuyCounter: 1,
    }
};

const DefaultShopDto = ShopDto([], [], []);

export { ShopDto, DefaultShopDto }