const getUniqueColors = (shopItemArray) => {
    const result = [];

    for (let i = 0; i < shopItemArray.length; i++) {
        const element = shopItemArray[i];
        const stockData = element["stockData"];

        for (let j = 0; j < stockData.length; j++) {
            const element = stockData[j];
            const color = element["color"];

            if (!result.includes(color)) {
                result.push(color);
            }
        }
    }

    return result;
}

const getUniqueSizes = (shopItemArray) => {
    const result = [];

    for (let i = 0; i < shopItemArray.length; i++) {
        const element = shopItemArray[i];
        const stockData = element["stockData"];

        for (let j = 0; j < stockData.length; j++) {
            const element = stockData[j];
            const size = element["size"];

            if (!result.includes(size)) {
                result.push(size);
            }
        }
    }

    return result;
}

const getUniqueBrands = (shopItemArray) => {
    const result = [];

    for (let i = 0; i < shopItemArray.length; i++) {
        const element = shopItemArray[i];
        const data = element["brand"];

        if (!result.includes(data)) {
            result.push(data);
        }
    }

    return result;
}

const getMinPrice = (shopItemArray) => {
    let min = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < shopItemArray.length; i++) {
        const element = shopItemArray[i];
        const stockData = element.stockData;

        for (let j = 0; j < stockData.length; j++) {
            const data = stockData[j];

            if (data.price < min) {
                min = data.price;
            }
        }
    }

    return min;
}

const getMaxPrice = (shopItemArray) => {
    let max = 0;

    for (let i = 0; i < shopItemArray.length; i++) {
        const element = shopItemArray[i];
        const stockData = element.stockData;

        for (let j = 0; j < stockData.length; j++) {
            const data = stockData[j];

            if (data.price > max) {
                max = data.price;
            }
        }
    }

    return max;
}

export { getUniqueColors, getUniqueSizes, getUniqueBrands, getMaxPrice, getMinPrice }