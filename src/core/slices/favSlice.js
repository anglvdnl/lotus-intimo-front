import { createSlice } from '@reduxjs/toolkit';
import { DefaultFavDto } from '../../data/dto/Favourites/FavDto';
import { addToFavouritesReducer as addFav, removeFromFavouritesReducer as removeFav } from '../reducers/favReducer';

const favSlice = createSlice({
    name: "_fav",
    initialState: DefaultFavDto,
    reducers: {
        addFav,
        removeFav
    }
})

const favActions = favSlice.actions;

export { favSlice, favActions }