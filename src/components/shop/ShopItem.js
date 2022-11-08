import React, { useState } from "react";
import styles from "./Shop.module.scss";
import icons from "../../data/utils/iconPaths";
import PuffLoader from "react-spinners/PuffLoader";
import CustomDropDown from "../customDropDown/CustomDropDown";
import { useDispatch } from "react-redux";
import { cartActions } from "../../core/slices/cartSlice";
import { getUniqueValues } from "../../data/utils/myUtils";
import { getItemImage } from "../../data/utils/imagesFactory";
import { Link, Outlet } from "react-router-dom";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import { CartItemDto } from "../../data/dto/Cart/CartItemDto";

function ShopItem(props) {
    const item = props.item;
    const [image, setImage] = useState(null);
    const [currItemIndex, setCurrItemIndex] = useState(0);
    const [dropDownStyles, setDropDownStyles] = useState(false);
    const [currentItemCode, setCurrentItemCode] = useState(0);

    const dispatch = useDispatch();
    const handleAddToCartClick = () => dispatch(cartActions.addItem(CartItemDto(item.id, !currentItemCode ? item.stockData[0].code : currentItemCode, 1)));

    if (image === null) {
        getItemImage(item.images[0], image => setImage(image));
    }

    const getColorsContent = () => {
        const content = [];

        const colors = getUniqueValues(item.stockData, "color");

        for (let i = 0; i < colors.length; i++) {
            const element = colors[i];
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

        setCurrentItemCode(item.stockData.find(x => x.size === value).code)

        item.stockData.map((x, index) => {
            if (x.color === availableColor && x.size === value) {
                setCurrItemIndex(index);
                return true;
            }

            return false;
        });
    }

    const handleColorSelect = (value) => {

        setCurrentItemCode(item.stockData.find(x => x.color === value).code)

        item.stockData.map((x, index) => {
            if (x.color === value && x.size === item.stockData[currItemIndex].size) {
                setCurrItemIndex(index);
                return true;
            }

            return false;
        });
    }

    return (
        <>
            <div className={styles.ShopItem}>
                <div className={styles.ImageContainer}>
                    <Link
                        to={cyrillicToTranslit({ preset: "uk" }).transform(`${item.name}/${item.id}`, "-")}
                        state={item}
                    >
                        {image === null &&
                            <div className={styles.Loader}>
                                <PuffLoader color={"#F81D88"} loading={image === null} size={150} />
                            </div>}

                        {image !== null && <img src={image} alt="" />}
                    </Link>
                    {item.heat && <img className={styles.Heat} src={icons.fire} alt='' />}
                    <div className={styles.Flags}>
                        {item.novelty &&
                            <div className={styles.New}>
                                <p>Новинка</p>
                            </div>}
                        {item.discount > 0 &&
                            <div className={styles.Discount}>
                                <p>-{item.discount} %</p>
                            </div>}
                    </div>

                    <div className={`${styles.ItemInfo} ${dropDownStyles ? styles.ItemInfoActive : null}`}>
                        <h3>{item.name}</h3>
                        <p>{item.discount > 0 && <s><b>{item.stockData[currItemIndex].price}₴</b></s>}{" "}
                            {item.stockData[currItemIndex].price - (item.stockData[currItemIndex].price * item.discount) / 100}₴</p>
                        <div className={styles.Btns}>
                            <CustomDropDown name="Розмір"
                                content={getSizeContent()}
                                onSelect={handleSizeSelect}
                                currValue={item.stockData[currItemIndex].size}
                                dropDownStyles={dropDownStyles}
                                setDropDownStyles={setDropDownStyles}
                            />
                            <CustomDropDown name="Колір"
                                content={getColorsContent()}
                                onSelect={handleColorSelect}
                                currValue={item.stockData[currItemIndex].color}
                                dropDownStyles={dropDownStyles}
                                setDropDownStyles={setDropDownStyles}
                            />
                        </div>
                        <button className={styles.Buy} onClick={handleAddToCartClick}>Купити</button>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default ShopItem
