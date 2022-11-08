const convertCategoryToName = category => {
    switch (category) {
        case 0:
            return "Для жінок";
        case 1:
            return "Для чоловіків";
        case 2:
            return "Для дітей";
        case 3:
            return "Сертифікати";
        default:
            return "Категорія";
    }
}

const convertSubCategoryToName = subCategory => {
    switch (subCategory) {
        case 0:
            return "Бюстгалтери";
        case 1:
            return "Комплект білизни";
        case 2:
            return "Труси";
        case 3:
            return "Боді";
        case 4:
            return "Колготки";
        case 5:
            return "Білизна для вагітних";
        case 6:
            return "Комплект трусиків";
        case 7:
            return "Топи";
        case 8:
            return "Майки";
        case 9:
            return "Шкарпетки/Сліди";
        case 10:
            return "Лосини";
        case 11:
            return "Купальники";
        case 12:
            return "Термобілизна";
        default:
            return "Під категорія";
    }
}

export { convertCategoryToName, convertSubCategoryToName };