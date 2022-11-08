import React, { useState } from 'react'
import 'pure-react-carousel/dist/react-carousel.es.css';
import styles from './Item.module.scss'
import ImageContainer from './ImageContainer';
import CustomDropDown from '../customDropDown/CustomDropDown';
import { getUniqueValues } from '../../data/utils/myUtils';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { favActions } from '../../core/slices/favSlice';
import { convertSubCategoryToName } from '../../data/converters/category';
import { cartActions } from '../../core/slices/cartSlice';
import { useParams } from 'react-router-dom';
import SimilarItem from '../similarItem/SimilarItem';
import Counter from '../counter/Counter';
import { CartItemDto } from '../../data/dto/Cart/CartItemDto';

function Item() {
    const { id } = useParams();
    const favs = useSelector(state => state._fav);
    const shop = useSelector(state => state._shop);
    const counter = useSelector(state => state._shop);
    const dispatch = useDispatch();

    const itemState = shop.items.find(x => x.id == id)
    const props = itemState
    const [currItemIndex, setCurrItemIndex] = useState(0);
    const [dropDownStyles, setDropDownStyles] = useState(false);
    const [currentItemCode, setCurrentItemCode] = useState(0);

    const handleAddToCartClick = () => dispatch(cartActions.addItem(CartItemDto(props.id, !currentItemCode ? props.stockData[0].code : currentItemCode, counter.itemsToBuyCounter)));

    const getColorsContent = () => {
        const content = [];

        const colors = getUniqueValues(props.stockData, "color");

        for (let i = 0; i < colors.length; i++) {
            const element = colors[i];
            content.push({
                value: element, isAvailable: props.stockData.some(x => x.color === element
                    && x.size === props.stockData[currItemIndex].size)
            });
        }

        return content;
    }

    const getSizeContent = () => {
        const content = [];

        const sizes = getUniqueValues(props.stockData, "size");

        for (let i = 0; i < sizes.length; i++) {
            const element = sizes[i];
            content.push({ value: element, isAvailable: true })
        }

        return content;
    }

    const handleSizeSelect = (value) => {
        const availableColor = !props.stockData.some(x => x.size === value && x.color === props.stockData[currItemIndex].color)
            ? props.stockData.find(x => x.size === value).color : props.stockData[currItemIndex].color;

        setCurrentItemCode(props.stockData.find(x => x.size === value).code)

        props.stockData.map((x, index) => {
            if (x.color === availableColor && x.size === value) {
                setCurrItemIndex(index);
                return true;
            }

            return false;
        });
    }

    const handleColorSelect = (value) => {
        setCurrentItemCode(props.stockData.find(x => x.color === value).code)

        props.stockData.map((x, index) => {
            if (x.color === value && x.size === props.stockData[currItemIndex].size) {
                setCurrItemIndex(index);
                return true;
            }

            return false;
        });
    }

    const getSimilarItemsArray = () => {
        const simiralItems = shop.items.filter(x => x.subCategory === props.subCategory && x.category === props.category && x.id != id)
        const shuffled = [...simiralItems].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 4);
    }

    const isLiked = () => favs.ids.includes(props.id);



    return (
        <div className={styles.Wrapper}>
            <main>
                <div className={styles.Content}>
                    <div>
                        <div className={styles.Title}>
                            <div>
                                <h1>{props.name}</h1>
                                {isLiked() ? <AiFillHeart onClick={() => dispatch(favActions.removeFav(props.id))} />
                                    : <AiOutlineHeart onClick={() => dispatch(favActions.addFav(props.id))} />}
                            </div>
                            <h3>{props.brand}</h3>
                        </div>
                        <ImageContainer id={id} images={props.images} />
                    </div>
                    <div className={styles.Btns}>
                        <h1>{props.price} грн</h1>
                        <div className={styles.DropDows}>
                            <CustomDropDown name="Розмір"
                                content={getSizeContent()}
                                onSelect={handleSizeSelect}
                                currValue={props.stockData[currItemIndex].size}
                                dropDownStyles={dropDownStyles}
                                setDropDownStyles={setDropDownStyles}
                            />
                            <CustomDropDown name="Колір"
                                content={getColorsContent()}
                                onSelect={handleColorSelect}
                                currValue={props.stockData[currItemIndex].color}
                                dropDownStyles={dropDownStyles}
                                setDropDownStyles={setDropDownStyles}
                            />
                        </div>
                        <div className={styles.Order}>
                            <Counter styles={styles.Counter} />
                            <button className={styles.Buy} onClick={() => handleAddToCartClick()}>Купити</button>
                        </div>
                        {/* <button className={styles.Sizes}>Розмірна сітка</button> */}
                    </div>
                    <div className={styles.Desc}>
                        <h2>{convertSubCategoryToName(props.subCategory)}</h2>
                        <h3>Опис</h3>
                        <p>{props.description}</p>
                    </div>
                </div>
                <div className={styles.Btns600px}>
                    <h1>{props.price} грн</h1>
                    <div className={styles.DropDows}>
                        <CustomDropDown name="Розмір"
                            content={getSizeContent()}
                            onSelect={handleSizeSelect}
                            currValue={props.stockData[currItemIndex].size}
                            dropDownStyles={dropDownStyles}
                            setDropDownStyles={setDropDownStyles}
                        />
                        <CustomDropDown name="Колір"
                            content={getColorsContent()}
                            onSelect={handleColorSelect}
                            currValue={props.stockData[currItemIndex].color}
                            dropDownStyles={dropDownStyles}
                            setDropDownStyles={setDropDownStyles}
                        />
                    </div>
                    <div className={styles.Order}>
                        <Counter styles={styles.Counter} />
                        <button className={styles.Buy} onClick={() => handleAddToCartClick()}>Купити</button>
                    </div>
                    <button className={styles.Sizes}>Розмірна сітка</button>
                </div>
                <div className={styles.Desc1050px}>
                    <h2>{convertSubCategoryToName(props.subCategory)}</h2>
                    <h3>Опис</h3>
                    <p>{props.description}</p>
                </div>
            </main>
            <section className={styles.StatsWrapper}>
                <div>
                    <h1>Характеристики</h1>
                    <table cellSpacing={0} cellPadding={10}>
                        <tbody>
                            <tr>
                                <td>Матеріал</td>
                                <td>{props.composition}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <section className={styles.SimilarItemsWrapper}>
                <h1>Схожі товари</h1>
                <div className={styles.Items}>
                    {getSimilarItemsArray().map((similarItem, index) => (
                        <SimilarItem similarItem={similarItem} key={index} />
                    ))}
                </div>
            </section>
            <div className={styles.Info}>
                <div>
                    <h3>Доставка</h3>
                    <ul>
                        <li>По новій почті</li>
                    </ul>
                </div>
                <div>
                    <h3>Оплата</h3>
                    <ul>
                        <li>Готівкою</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Item