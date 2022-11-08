import React from 'react'
import cyrillicToTranslit from "cyrillic-to-translit-js";
import { Link, Navigate } from 'react-router-dom'
import { getItemImage } from '../../data/utils/imagesFactory';
import { useState } from 'react';
import styles from '../Item/Item.module.scss'

function SimilarItem({ similarItem }) {
    const [imageState, setImageState] = useState({ key: similarItem.images[0], image: null })

    if (imageState.image === null || imageState.key !== similarItem.images[0]) {
        getItemImage(similarItem.images[0], (image) => {
            setImageState({ key: similarItem.images[0], image: image })
        })
    }

    return (
        <div className={styles.SimilarItem}>
            <Link to={`../shop/${cyrillicToTranslit({ preset: "uk" }).transform(`${similarItem.name}`, "-")}/${similarItem.id}`}>
                <img src={imageState.image} />
                <h3>{similarItem.name}</h3>
                <p>{similarItem.price}₴</p>
            </Link>
        </div>
    )
}
export default SimilarItem