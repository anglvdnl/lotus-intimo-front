import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { filterTypes } from '../../data/utils/filterTypes'
import { getMaxPrice, getMinPrice, getUniqueBrands, getUniqueColors, getUniqueSizes } from '../../data/utils/shopItemExtension'
import Categories from './categories/Categories'
import styles from './Filters.module.scss'
import Filter from './filters/Filter'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'
import MultiRangeSlider from '../multiRangeSlider/MultiRangeSlider'

function Filters() {
    const shop = useSelector(state => state._shop);
    const colors = getUniqueColors(shop.items);
    const sizes = getUniqueSizes(shop.items);
    const brands = getUniqueBrands(shop.items);
    const [categorySelect, setCategorySelect] = useState({ type: "", isActive: false })

    const handleCategorySelect = (categoryType) => {
        const isActive = categoryType === categorySelect.type
            ? !categorySelect.isActive
            : true

        setCategorySelect({ type: categoryType, isActive: isActive })
    }

    const [filtersView, setFiltersView] = useState(false);

    return (
        <>
            <aside className={`${styles.Aside} ${filtersView ? styles.AsideAdapt : null}`}>
                <div className={styles.Wrapper}>
                    <div className={styles.Categories}>
                        <Categories
                            categoryType={0}
                            name='Для жінок'
                            categorySelect={categorySelect}
                            handleCategorySelect={handleCategorySelect} />
                        <Categories
                            categoryType={1}
                            name='Для чоловіків'
                            categorySelect={categorySelect}
                            handleCategorySelect={handleCategorySelect} />
                        <Categories
                            categoryType={2}
                            name='Для дітей'
                            categorySelect={categorySelect}
                            handleCategorySelect={handleCategorySelect} />
                    </div>
                    <div className={styles.Filters}>
                        <div className={`${styles.Price} ${styles.FiltersDiv}`}>
                            <p>Ціна</p>
                            <MultiRangeSlider min={0} max={getMaxPrice(shop.items)} />
                        </div>

                        <div className={`${styles.Colors} ${styles.FiltersDiv}`}>
                            <p>Колір</p>
                            <ul>
                                {colors.map((value, index) => (
                                    <Filter value={value} key={index} index={index} filterType={filterTypes.color} />
                                ))}
                            </ul>
                        </div>
                        <div className={`${styles.Sizez} ${styles.FiltersDiv}`}>
                            <p>Розмір</p>
                            <ul>
                                {sizes.map((value, index) => (
                                    <Filter value={value} key={index} index={index} filterType={filterTypes.size} />
                                ))}
                            </ul>
                        </div>
                        <div className={`${styles.Brand} ${styles.FiltersDiv}`}>
                            <p>Бренд</p>
                            <ul>
                                {brands.map((value, index) => (
                                    <Filter value={value} key={index} index={index} filterType={filterTypes.brand} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </aside >
            <span
                onClick={() => setFiltersView(!filtersView)}
                className={`${styles.FiltersToggle} ${filtersView ? styles.FiltersToggleActive : null}`}
            >{filtersView
                ? <IoMdArrowDropleft />
                : <IoMdArrowDropright />
                }
            </span>
        </>
    )
}

export default Filters