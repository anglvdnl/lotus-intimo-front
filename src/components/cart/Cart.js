import React, { useState } from 'react'
import CartShowcase from './CartShowcase';
import { useSelector } from 'react-redux'
import cartImage from '../../static/Images/cart.png'
import { Link } from 'react-router-dom';
import styles from './Cart.module.scss'

function Cart() {
    const cart = useSelector(state => state._cart);

    return (
        <>
            <div className={styles.CartWrapper}>
                <h1>Кошик</h1>
                {cart.items.length === 0
                    ? <div className={styles.Empty}>
                        <img src={cartImage} />
                        <p>Ваш кошик пустий <br /> <Link to="../shop">Каталог</Link></p>
                    </div>
                    : <CartShowcase cartItems={cart.items} />}
            </div>
        </>
    )
}

export default Cart