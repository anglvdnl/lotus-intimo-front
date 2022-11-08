const convertColorNameToHex = (colorName) => {
    let colorHex = "";

    switch (colorName) {
        case "Білий": colorHex = "#fff"; break;
        case "Чорний": colorHex = "#000"; break;
        case "Червоний": colorHex = "#ff0000"; break;
        case "Жовтий": colorHex = "#FFFF00"; break;
        case "Зелений": colorHex = "#00FF00"; break;
        case "Блакитний": colorHex = "#00FFFF"; break;
        case "Синій": colorHex = "#0000FF"; break;
        case "Помаранчевий": colorHex = "#FFA500"; break;
        case "Фіолетовий": colorHex = "#9F2B68"; break;
        case "Сірий": colorHex = "#808080"; break;
        case "Бурий": colorHex = "#6B5636"; break;
        case "Срібний": colorHex = "#C0C0C0"; break;
        case "Рожевий": colorHex = "#ffc0cb"; break;
        case "Бордовий": colorHex = "#800000"; break;
        case "Коричневий": colorHex = "#964B00"; break;
        case "Тілесний": colorHex = "#d9b99b"; break;
        case "Темно-синій": colorHex = "#000080"; break;
        case "Бірюзовий": colorHex = "#00ffef"; break;
    }

    return colorHex;
}

export { convertColorNameToHex }