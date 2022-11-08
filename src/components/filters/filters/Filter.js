import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { containsInFilter } from '../../../core/reducers/shopReducers'
import { shopActions } from '../../../core/slices/shopSlice'
import { FilterDto } from '../../../data/dto/Shop/FilterDto'
import { filterTypes } from '../../../data/utils/filterTypes'
import { convertColorNameToHex } from '../../../data/converters/colors'
import styles from '../Filters.module.scss'

function Filter({ index, value, filterType }) {
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
            case filterTypes.color:
                return shop.filteredItems.some(x => x.stockData.some(y => y.color === value));
            case filterTypes.size:
                return shop.filteredItems.some(x => x.stockData.some(y => y.size === value));
            case filterTypes.brand:
                return shop.filteredItems.some(x => x.brand === value);
            default:
                return false;
        }
    }

    const isActive = containsInFilter(shop.filters, filterType, value);
    const isAvailable = checkForAvailability();

    return (
        <li>
            <label className={!isAvailable ? styles.Disabled : null} htmlFor={filterType + index}>
                <div>
                    {filterType === "color"
                        ? <span className={styles.Square} style={{ backgroundColor: convertColorNameToHex(value) }}></span>
                        : null}
                    {value}
                </div>
                <input className={!isAvailable ? styles.Disabled : null} disabled={!isAvailable}
                    onClick={handleDispatch} id={filterType + index} type='checkbox' />
                <span className={styles.Checkbox}></span>
            </label>
        </li>
    )
}

export default Filter