const AdminPropsDto = (isAdmin, addItemData, updateItemData) => {
    return {
        isAdmin: isAdmin,
        addItemData: addItemData,
        updateItemData: updateItemData,
        searchValue: ""
    }
};

const AdminItemData = {
    name: "",
    price: 0,
    brand: "",
    description: "",
    category: "",
    subCategory: "",
    discount: 0,
    stockData: [{
        size: "",
        color: "",
        code: "",
        price: 0
    }],
    images: [],
    novelty: false,
    heat: false,
    composition: ""
}

const AdminUpdateItemData = {
    shopItem: null,
    data: AdminItemData
}

const DefaltAdminPropsDto = AdminPropsDto(false, AdminItemData, AdminUpdateItemData)

export { AdminPropsDto, DefaltAdminPropsDto, AdminItemData, AdminUpdateItemData };