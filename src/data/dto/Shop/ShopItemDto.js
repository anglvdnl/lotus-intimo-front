const ShopItemDto = (id, name, price, brand, description, category,
    subCategory, discount, stockData, novelty, heat, images, composition) => {
    return {
        id: id,
        name: name,
        price: price,
        brand: brand,
        description: description,
        category: category,
        subCategory: subCategory,
        discount: discount,
        isOnDiscount: discount > 0,
        stockData: stockData,
        novelty: novelty,
        heat: heat,
        images: images,
        composition: composition,
    }
}

export { ShopItemDto };