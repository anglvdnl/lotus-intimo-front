const CartDto = (items) => {
    return {
        items: items
    }
};

const DefaultCartDto = CartDto([]);

export { CartDto, DefaultCartDto };