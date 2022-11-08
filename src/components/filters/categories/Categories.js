import React, { useState } from 'react'
import styles from '../Filters.module.scss'
import { IoMdArrowDropdown } from 'react-icons/io'
import CategoriesMenu from './CategoriesMenu'

function Categories({ handleCategorySelect, categorySelect, categoryType, name }) {

    const isCategoryActive = (categoryType) => categoryType === categorySelect.type && categorySelect.isActive

    return (
        <>
            <div
                className={`${styles.Category} ${isCategoryActive(categoryType) ? styles.CategoryActive : null}`}
                onClick={() => {
                    handleCategorySelect(categoryType)
                }}
            >
                <h2>{name}</h2>
                <IoMdArrowDropdown />
            </div>
            {isCategoryActive(categoryType) && <CategoriesMenu categoryType={categoryType} />}
        </>
    )
}

export default Categories