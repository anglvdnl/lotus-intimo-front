import axios from "axios";
import { CartDto } from "../../data/dto/Cart/CartDto";
import { CartItemDto } from "../../data/dto/Cart/CartItemDto";
import { DefaultUser } from "../../data/dto/User/UserDto";
import { serverApiPath } from "../../data/utils/serverApiPaths";
import { storageKeys } from "../../data/utils/storageKeys";

const setCartReducer = (state, action) => {
    const cartItems = action.payload;

    state.items = cartItems;

    localStorage.setItem(storageKeys.cart, JSON.stringify(state.items));
    console.log(`Setted to cart ${state.items.length} items`);
};

const combineCartsReducer = (state, action) => {
    const cart = action.payload;

    if (isCartsEqual(cart.items, state.items)) return;

    for (let i = 0; i < cart.items.length; i++) {
        const item = cart.items[i];
        const itemInCart = state.items.find(x => x.id === item.id);

        if (itemInCart !== undefined) {
            if (item.count !== itemInCart.count) {
                itemInCart.count += item.count;
            }
        } else {
            state.items.push(CartItemDto(item.id, item.count));
        }
    }

    updateUserCart(state.items);

    console.log(`Combined carts`);
}

const addItemReducer = (state, action) => {
    const itemInCart = state.items.find(x => x.code === action.payload.code);

    itemInCart !== undefined
        ? itemInCart.count += action.payload.count
        : state.items.push(CartItemDto(action.payload.id, action.payload.code, action.payload.count));

    updateUserCart(state.items);

    console.log("Add to cart: " + action.payload.code);
}

const removeItemReducer = (state, action) => {
    const index = state.items.indexOf(state.items.find(x => x.code === action.payload));

    state.items.splice(index, 1);

    updateUserCart(state.items);

    console.log("Remove from cart: " + action.payload);
}

const updateItemCodeReducer = (state, action) => {
    const oldItem = state.items.find(x => x.code === action.payload.prevCode);
    const newItem = state.items.find(x => x.code === action.payload.newCode);

    if (oldItem) {
        if (newItem) {
            newItem.count += oldItem.count;

            const index = state.items.indexOf(oldItem);
            state.items.splice(index, 1);
        } else {
            oldItem.code = action.payload.newCode;
        }

        updateUserCart(state.items);
    }
}

const handleCounterReducer = (state, action) => {
    const currentItem = state.items.find(x => x.code === action.payload[0])

    if (action.payload[1] === "increment") {
        currentItem.count++
    } else if (action.payload[1] === "decrement") {
        currentItem.count--
    }

    if (currentItem.count < 1) {
        currentItem.count = 1
    }
}

const updateUserCart = cartItems => {
    let userData = DefaultUser;

    if (localStorage.getItem(storageKeys.user)) {
        userData = JSON.parse(localStorage.getItem(storageKeys.user));
    }

    if (userData.success) {
        axios.post(serverApiPath.postSetUserCart, { email: userData.email, cart: CartDto(cartItems) })
            .then(response => console.log(`${response.data.success ? "User cart updated!" : response.data.message}`))
            .catch(error => console.log(error));
    }

    localStorage.setItem(storageKeys.cart, JSON.stringify(cartItems));
    console.log(cartItems)
}

const isCartsEqual = (cartItems, anotherItems) => {
    if (cartItems.length === anotherItems.length) {
        for (let i = 0; i < cartItems.length; i++) {
            const cartItem = cartItems[i];
            const anotherItem = anotherItems[i];

            if (cartItem.id !== anotherItem.id || cartItem.count !== anotherItem.count) {
                return false;
            }
        }

        return true;
    }
    else {
        return false;
    }
}

export { addItemReducer, removeItemReducer, setCartReducer, combineCartsReducer, handleCounterReducer, updateItemCodeReducer };