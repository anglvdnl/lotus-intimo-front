import React, { useState } from 'react'
import ShopItem from './ShopItem'
import { useDispatch, useSelector } from 'react-redux';
import styles from './Shop.module.scss'
import './index.scss'
import Filters from '../filters/Filters';
import GlobalFilter from './globalFilter/GlobalFilter';
import { filterTypes } from '../../data/utils/filterTypes';
import { shopActions } from '../../core/slices/shopSlice';
import PaginationView from '../pagination/Pagination';

const initedShopItems = [];

function Shop() {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(12)

    const shopState = useSelector(state => state._shop);
    const dispatch = useDispatch();

    const handleSearchChange = (event) => dispatch(shopActions.setSearchValue(event.target.value));

    const isInFilter = (id) => {
        return shopState.filteredItems.filter(x => x.id === id).length > 0
    }

    if (shopState.items.length === 0) {
        return (<div>Loading...</div>);
    }
    else if (initedShopItems.length === 0 && shopState.items.length > 0) {
        for (let i = 0; i < shopState.items.length; i++) {
            initedShopItems.push({ id: shopState.items[i].id, jsx: (<ShopItem key={i} item={shopState.items[i]} />) });
        }
    }

    const shopBody = [];
    for (let i = 0; i < initedShopItems.length; i++) {
        const element = initedShopItems[i];
        if (isInFilter(element.id)) {
            shopBody.push(element.jsx)
        }
    }

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = shopBody.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className={styles.Shop}>
            <Filters />
            <div className={styles.Items}>
                <div className={styles.Search}>
                    <input placeholder='ПОШУК' onChange={handleSearchChange} />
                    <div className={styles.GlobalFilters}>
                        <div>
                            <GlobalFilter name="Новинки" value={true} filterType={filterTypes.novelty} />
                        </div>
                        <div>
                            <GlobalFilter name="Знижка" value={true} filterType={filterTypes.discount} />
                        </div>
                        <div>
                            <GlobalFilter name="Хіт" value={true} filterType={filterTypes.heat} />
                        </div>
                    </div>
                </div>
                <div className={styles.ItemsList}>
                    {currentItems}
                </div>
                <PaginationView totalItems={shopBody.length} itemsPerPage={itemsPerPage} pagination={pagination} />
            </div>
        </div>
    );
}

export default Shop