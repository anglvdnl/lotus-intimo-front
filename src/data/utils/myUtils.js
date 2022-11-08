const wrapStr = str => {
    if (str.length > 8) {
        str = str.substring(0, 8) + "..";
    }

    return str;
};

const getUniqueCountFromArrayOfObjects = array => {
    let uniqueCount = 0;

    for (let i = 0; i < array.length; i++) {
        if (array.indexOf(array.find(x => x.id === array[i].id)) === i) {
            uniqueCount++;
        }
    }

    return uniqueCount;
}

const getUniqueValues = (array, propertyName) => {
    const uniqueValues = [];

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const value = element[propertyName];

        if (Array.isArray(value)) {
            for (let j = 0; j < value.length; j++) {
                if (!uniqueValues.includes(value[j])) {
                    uniqueValues.push(value[j]);
                }
            }

            continue;
        }

        if (!uniqueValues.includes(value)) {
            uniqueValues.push(value);
        }
    }

    return uniqueValues;
}

const blobToImage = (blob, callback) => {
    var reader = new window.FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => callback(reader.result);
}

export { wrapStr, getUniqueCountFromArrayOfObjects, getUniqueValues, blobToImage };