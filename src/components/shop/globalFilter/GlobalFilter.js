import React from 'react'
import styles from '../Shop.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { containsInFilter } from '../../../core/reducers/shopReducers'
import { shopActions } from '../../../core/slices/shopSlice'
import { FilterDto } from '../../../data/dto/Shop/FilterDto'
import { filterTypes } from '../../../data/utils/filterTypes'

function GlobalFilter({ name, value, filterType }) {
    const dispatch = useDispatch();
    const shop = useSelector(state => state._shop);

    const handleDispatch = () => {
        if (isActive) {
            dispatch(shopActions.removeFilter(FilterDto(filterType, value)))
        } else {
            dispatch(shopActions.addFilter(FilterDto(filterType, value)))
        }
    }

    const checkForAvailability = () => {
        switch (filterType) {
            case filterTypes.novelty:
                return shop.filteredItems.some(x => x.novelty);
            case filterTypes.heat:
                return shop.filteredItems.some(x => x.heat);
            case filterTypes.discount:
                return shop.filteredItems.some(x => x.isOnDiscount);
            default: 
                return false;
        }
    }

    const isActive = containsInFilter(shop.filters, filterType, value);
    const isAvailable = checkForAvailability();

    return (
        <p>
            <label className={!isAvailable ? styles.Disabled : null} htmlFor={filterType}>{name}
                <input onClick={handleDispatch} id={filterType} type='checkbox' disabled={!isAvailable}/>
                <span></span>
            </label>
        </p>
    )
}

export default GlobalFilter