const FavDto = (ids) => {
    return {
        ids: ids
    }
};

const DefaultFavDto = FavDto([]);

export { FavDto, DefaultFavDto }