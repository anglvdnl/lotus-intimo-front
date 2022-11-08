import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import styles from './Cart.module.scss'
import { Link } from 'react-router-dom';
import { cartActions } from '../../core/slices/cartSlice';
import { CartItemDto } from '../../data/dto/Cart/CartItemDto';

function CartShowcase(props) {
    const shop = useSelector(state => state._shop);
    const dispatch = useDispatch();
    const cartItems = props.cartItems;
    const shopItems = [];
    const body = [];

    const onCodeChange = (id, prevCode, newCode) => {
        dispatch(cartActions.updateItemCode({ id: id, prevCode: prevCode, newCode: newCode }))
    }

    for (let i = 0; i < cartItems.length; i++) {
        const shopItem = shop.items.find(x => x.id === cartItems[i].id);
        const currentStockData = shopItem.stockData.find(x => x.code === cartItems[i].code);

        if (shopItem) {
            body.push(<CartItem key={i} item={shopItem} onCodeChange={onCodeChange} code={cartItems[i].code} count={cartItems[i].count} />);
            shopItems.push({ item: shopItem, count: cartItems[i].count, currentStockData: currentStockData });
        }
    }

    const totalPrice = shopItems.reduce((total, element) => total + (element.currentStockData.price - (element.currentStockData.price * element.item.discount) / 100) * element.count, 0);

    return (
        <div className={styles.CartBody}>
            <div>
                {body}
            </div>
            <aside>
                <p className={styles.Total} key='total'>До оплати: {totalPrice}.</p>
                <Link to="/cart/order"><button>Оформити</button></Link>
            </aside>
        </div>
    );
}

export default CartShowcase