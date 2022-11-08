import React from 'react'
import { useSelector } from 'react-redux'

import styles from '../Filters.module.scss'
import CategoriesItem from './CategoriesItem'

function CategoriesMenu({ categoryType }) {
  const shop = useSelector(state => state._shop)

  function handleSubCategories() {
    const filteredSubs = [];
    shop.items.map(x => categoryType === x.category && !filteredSubs.includes(x.subCategory) ? filteredSubs.push(x.subCategory) : null)
    return filteredSubs;
  }

  return (
    <div className={styles.Items}>
      <ul>
        {handleSubCategories().map((value, index) => (
          <CategoriesItem value={value} categoryType={categoryType} key={index} />
        ))}
      </ul>
    </div>
  )
}

export default CategoriesMenu