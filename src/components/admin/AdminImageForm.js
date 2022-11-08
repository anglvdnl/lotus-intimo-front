import React, { useState } from 'react'
import { ImCross } from "react-icons/im";
import { FaRegTrashAlt } from 'react-icons/fa'
import styles from './AdminForm.module.scss'

function AdminImageForm({ url, image, onSelect }) {
    const [removeImage, setRemoveImage] = useState(false)

    return (
        <>
            <img className={removeImage ? styles.ActiveImage : null} src={image} />
            {removeImage
                ? <ImCross
                    onClick={() => {
                        setRemoveImage(!removeImage);
                        onSelect(url, false);
                    }} />
                : <FaRegTrashAlt
                    onClick={() => {
                        setRemoveImage(!removeImage)
                        onSelect(url, true);
                    }} />
            }
        </>
    )
}

export default AdminImageForm