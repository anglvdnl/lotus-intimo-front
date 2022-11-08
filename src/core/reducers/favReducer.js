const addToFavouritesReducer = (state, action) => {
    const itemId = action.payload

    if (!state.ids.includes(itemId)) {
        state.ids.push(itemId)
    }
}

const removeFromFavouritesReducer = (state, action) => {
    const itemId = action.payload
    console.log(itemId)

    if (state.ids.includes(itemId)) {
        const index = state.ids.indexOf(state.ids.find(x => x === itemId))
        state.ids.splice(index, 1)
    }
}

export { addToFavouritesReducer, removeFromFavouritesReducer }