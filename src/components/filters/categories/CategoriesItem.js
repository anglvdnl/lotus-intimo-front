import React from 'react'
import styles from '../Filters.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { shopActions } from '../../../core/slices/shopSlice'
import { convertSubCategoryToName } from '../../../data/converters/category'
import { FilterDto } from '../../../data/dto/Shop/FilterDto'
import { containsInFilter } from '../../../core/reducers/shopReducers'

function CategoriesItem({ categoryType, value }) {
    const shop = useSelector(state => state._shop);
    const dispatch = useDispatch();
    const filterType = "category_" + categoryType;

    const isActive = containsInFilter(shop.filters, filterType, value);

    function handleClick() {
        if (isActive) {
            dispatch(shopActions.removeFilter(FilterDto(filterType, value)))

        } else {
            dispatch(shopActions.addFilter(FilterDto(filterType, value)))
        }
    }

    return (
        <li onClick={handleClick} className={isActive ? styles.active : undefined}>
            {convertSubCategoryToName(value)}
        </li>
    )
}

export default CategoriesItem