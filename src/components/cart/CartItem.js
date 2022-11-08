import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../core/slices/cartSlice';
import { getItemImage } from '../../data/utils/imagesFactory';
import { getUniqueValues } from '../../data/utils/myUtils';
import CustomDropDown from '../customDropDown/CustomDropDown';
import styles from './Cart.module.scss'
import { MdDeleteForever } from 'react-icons/md'

function CartItem(props) {
  const item = props.item;
  const count = props.count;
  const code = props.code;
  const onCodeChange = props.onCodeChange

  const [currItemIndex, setCurrItemIndex] = useState(0);
  const [dropDownStyles, setDropDownStyles] = useState(false);
  const [imageState, setImageState] = useState({ key: item.images[0], image: null });

  const currentStockData = item.stockData.find(x => x.code === code);

  const discountPrice = currentStockData.price - (currentStockData.price * item.discount) / 100


  if (imageState.image === null || imageState.key !== item.images[0]) {
    getItemImage(item.images[0], (image) => {
      setImageState({ key: item.images[0], image: image })
    })
  }

  const dispatch = useDispatch();
  const handleRemoveClick = () => dispatch(cartActions.removeItem(currentStockData.code));

  const getColorsContent = () => {
    const content = [];

    const colors = getUniqueValues(item.stockData, "color");

    for (let i = 0; i < colors.length; i++) {
      const element = colors[i];

      // console.log(item.stockData[currItemIndex], currItemIndex)

      content.push({
        value: element, isAvailable: item.stockData.some(x => x.color === element
          && x.size === item.stockData[currItemIndex].size)
      });
    }

    return content;
  }

  const getSizeContent = () => {
    const content = [];

    const sizes = getUniqueValues(item.stockData, "size");

    for (let i = 0; i < sizes.length; i++) {
      const element = sizes[i];
      content.push({ value: element, isAvailable: true })
    }

    return content;
  }

  const handleSizeSelect = (value) => {
    const availableColor = !item.stockData.some(x => x.size === value && x.color === item.stockData[currItemIndex].color)
      ? item.stockData.find(x => x.size === value).color : item.stockData[currItemIndex].color;

    let tempIndex = 0;

    item.stockData.map((x, index) => {
      if (x.color === availableColor && x.size === value) {
        tempIndex = index
        setCurrItemIndex(index);
        return true;
      }

      return false;
    });

    onCodeChange(item.id, code, item.stockData[tempIndex].code);
  }

  const handleColorSelect = (value) => {
    let tempIndex = 0;

    item.stockData.map((x, index) => {
      if (x.color === value && x.size === item.stockData[currItemIndex].size) {
        tempIndex = index
        setCurrItemIndex(index);
        return true;
      }

      return false;
    });

    onCodeChange(item.id, code, item.stockData[tempIndex].code);
  }

  return (
    <div className={styles.CartItem}>
      <div className={styles.Wrapper}>
        <img src={imageState.image} />
        <div className={styles.Content}>
          <h3>{item.name}</h3>
          <div className={styles.Params}>
            <div className={styles.DropDowns}>
              <div className={styles.DropDownItem}>
                <CustomDropDown name="Розмір"
                  content={getSizeContent()}
                  onSelect={handleSizeSelect}
                  currValue={currentStockData.size}
                  dropDownStyles={dropDownStyles}
                  setDropDownStyles={setDropDownStyles}
                />
              </div>
              <div className={styles.DropDownItem}>
                <CustomDropDown name="Колір"
                  content={getColorsContent()}
                  onSelect={handleColorSelect}
                  currValue={currentStockData.color}
                  dropDownStyles={dropDownStyles}
                  setDropDownStyles={setDropDownStyles}
                />
              </div>
            </div>
            <div className={styles.PriceWrapper}>
              <div className={styles.Counter}>
                <button onClick={() => dispatch(cartActions.handleCounter([currentStockData.code, "increment"]))}>+</button>
                <p>{count}</p>
                <button onClick={() => dispatch(cartActions.handleCounter([currentStockData.code, "decrement"]))}>−</button>
              </div>
              <p className={styles.PriceX}>x</p>
              <p className={styles.Price}>{discountPrice} ₴</p>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.Total}>Всього: {count * discountPrice} ₴</p>
      <MdDeleteForever onClick={handleRemoveClick} />
    </div>
  )
}

export default CartItem