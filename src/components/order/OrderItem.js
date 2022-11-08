import React, { useState } from 'react'
import { getItemImage } from '../../data/utils/imagesFactory';
import styles from './Order.module.scss'

function OrderItem(props) {
    const item = props.item;
    const count = props.count;
    const code = props.code

    const [imageState, setImageState] = useState({ key: item.images[0], image: null });

    const currentStockData = item.stockData.find(x => x.code === code);

    const discountPrice = currentStockData.price - (currentStockData.price * item.discount) / 100

    if (imageState.image === null || imageState.key !== item.images[0]) {
        getItemImage(item.images[0], (image) => {
            setImageState({ key: item.images[0], image: image })
        })
    }

    return (
        <div className={styles.Item}>
            <img src={imageState.image} />
            <div className={styles.ItemInfo}>
                <h2>{item.name}</h2>
                <span>
                    <p>Розмір: {currentStockData.size}</p>
                    <p>Колір: {currentStockData.color}</p>
                </span>
                <p>Кількість: {count}</p>
            </div>
            <h3>{count * discountPrice} ₴</h3>
        </div>
    )
}

export default OrderItem