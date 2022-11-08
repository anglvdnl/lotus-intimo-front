import React, { useState } from "react"
import styles from './Admin.module.scss'
import { ImCross, ImPencil } from "react-icons/im";
import { getItemImage } from '../../data/utils/imagesFactory'
import { Link } from "react-router-dom";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import { useSelector } from "react-redux";

function AdminItem({ shopItem, onDelete }) {
    const user = useSelector(reducers => reducers._auth);
    const [image, setImage] = useState(null);

    getItemImage(shopItem.images[0], imageCallback => {
        if (imageCallback !== image) {
            setImage(imageCallback);
        }
    });

    function handleConfirm() {
        if (window.confirm("Ви точно бажаєте видалити цей товар?")) {
            onDelete()
        }
    }

    return (
        <div>
            <img src={image} />
            <h1>{shopItem.name}</h1>
            <span className={styles.Edit}>
                <Link
                    to={`${shopItem.id}?secret=${user.secret}`}
                >
                    <ImPencil />
                </Link>
            </span>
            <span className={styles.Delete}>
                <ImCross onClick={handleConfirm} />
            </span>
        </div>
    )
}

export default AdminItem
