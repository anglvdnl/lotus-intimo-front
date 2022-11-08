import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getItemImage } from '../../data/utils/imagesFactory';
import { getUniqueBrands, getUniqueColors, getUniqueSizes } from '../../data/utils/shopItemExtension';
import { AiOutlinePlus } from 'react-icons/ai';
import styles from './AdminForm.module.scss';
import AdminImageForm from './AdminImageForm';
import { convertCategoryToName, convertSubCategoryToName } from '../../data/converters/category';

let imagesToRemove = [];

function AdminItemForm({ formKey, itemData, onNameChange, onPriceChange, onDescriptionChange, onBrandChange, onCategoryChange,
    onSubCategoryChange, onDiscountChange, onStockSizeChange, onStockColorChange, onStockCodeChange, onStockPriceChange,
    onNoveltyChange, onHeatChange, onImagesChange, onStockAdd, onStockRemove, onImageRemove, onCompositionChange }) {

    const shop = useSelector(state => state._shop);
    const [imagePairs, setImagePairs] = useState([]);
    const [selectedImages, setSelectedImages] = useState(0)
    const [autoInput, setAutoInput] = useState({ type: "", value: "" });

    for (let i = 0; i < itemData.images.length; i++) {
        const element = itemData.images[i]
        if (!imagePairs.some((x) => x.url === element)) {
            getItemImage(element, (image) => {
                imagePairs.push({ url: element, image: image })
                setImagePairs([...imagePairs])
            })
        }
    }

    const filterColors = () => {
        const colors = getUniqueColors(shop.items);
        return colors.filter(value => value.toLowerCase().includes(autoInput.value.toLowerCase()) || autoInput.value === "");
    }

    const filterBrands = () => {
        const brands = getUniqueBrands(shop.items);
        return brands.filter(value => value.toLowerCase().includes(autoInput.value.toLowerCase()) || autoInput.value === "");
    }

    const filterCategories = () => {
        return [0, 1, 2];
    }

    const filterSubCategories = () => {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }

    const filterSizes = () => {
        const sizes = getUniqueSizes(shop.items);
        return sizes.filter(value => value.toLowerCase().includes(autoInput.value.toLowerCase()) || autoInput.value === "");
    }

    const imageRemoveHandler = (url, isSelected) => {
        if (isSelected) {
            imagesToRemove.push(url)
        } else {
            for (let i = 0; i < imagesToRemove.length; i++) {
                const element = imagesToRemove[i];

                if (element === url) {
                    imagesToRemove.splice(i, 1);
                    break;
                }
            }
        }

        onImageRemove(imagesToRemove)
    }

    return (
        <form id="addItemForm">
            <div className={styles.InputsWrapper}>
                <div className={styles.Inputs}>
                    <input id="addName" placeholder="Назва *" value={itemData.name} onChange={(event) => onNameChange(event.target.value)}></input>
                    <input id="addPrice" placeholder="Ціна *" type="number" value={itemData.price === 0 ? "" : itemData.price} onChange={(event) => onPriceChange(event.target.value)}></input>
                    <input id="addDescription" placeholder="Опис" value={itemData.description} onChange={(event) => onDescriptionChange(event.target.value)}></input>
                    <input id="addBrand" autoComplete='off' placeholder="Бренд" value={itemData.brand}
                        onClick={() => setAutoInput({ type: "brand", value: "" })}
                        onChange={(event) => {
                            onBrandChange(event.target.value);
                            setAutoInput({ type: "brand", value: event.target.value });
                        }} />

                    <div style={{ top: "150px" }} className={styles.DropdownContent}>
                        {filterBrands().map((x, index) => (<p key={'brand' + index} onClick={() => onBrandChange(x)}>{x}</p>))}
                    </div>

                    <input id="addCategory" placeholder="Категорія *" type="text" value={convertCategoryToName(itemData.category)} readOnly
                        onClick={() => setAutoInput({ type: "category", value: "" })}
                        onChange={(event) => {
                            onCategoryChange(event.target.value)
                            setAutoInput({ type: "category", value: event.target.value })
                        }} />
                    <div style={{ top: "195px" }} className={styles.DropdownContent}>
                        {filterCategories().map((x, index) => (<p key={'category' + index} onClick={() => onCategoryChange(x)}>{convertCategoryToName(x)}</p>))}
                    </div>
                    <input id="addSubCategory" placeholder="Під категорія *" type="text" value={convertSubCategoryToName(itemData.subCategory)} readOnly
                        onClick={() => setAutoInput({ type: "subCategory", value: "" })}
                        onChange={(event) => {
                            onSubCategoryChange(event.target.value)
                            setAutoInput({ type: "subCategory", value: event.target.value })
                        }} />
                    <div style={{ top: "240px" }} className={styles.DropdownContent}>
                        {filterSubCategories().map((x, index) => (<p key={'subCategory' + index} onClick={() => onSubCategoryChange(x)}>{convertSubCategoryToName(x)}</p>))}
                    </div>
                    <input id="addDiscount" placeholder="Знижка" type="number" value={itemData.discount === 0 ? "" : itemData.discount} onChange={(event) => onDiscountChange(event.target.value)}></input>
                    <input id='addComposition' placeholder='Склад' type="text" value={itemData.composition} onChange={(e) => onCompositionChange(e.target.value)} />
                </div>
                {[...Array(itemData.stockData.length)].map((x, i) => (
                    <div className={styles.StockData} key={i}>
                        <hr />
                        {i > 0 && <input type='button' className={styles.RemoveButton} value="Видалити" onClick={() => onStockRemove(i)} />}
                        <input id={"stockSize" + i} autoComplete='off' placeholder="Розмір *" value={itemData.stockData[i].size}
                            onClick={() => setAutoInput({ type: "size", value: "" })}
                            onChange={(event) => {
                                onStockSizeChange(i, event.target.value);
                                setAutoInput({ type: "size", value: event.target.value });
                            }} />

                        <div style={{ top: `${i > 0 ? 75 : 27}px` }} className={styles.DropdownContent}>
                            {filterSizes().map((x, index) => (<p key={'size' + index} onClick={() => onStockSizeChange(i, x)}>{x}</p>))}
                        </div>

                        <input id={"stockColor" + i} autoComplete='off' placeholder="Колір *" value={itemData.stockData[i].color}
                            onClick={() => setAutoInput({ type: "color", value: "" })}
                            onChange={(event) => {
                                onStockColorChange(i, event.target.value);
                                setAutoInput({ type: "color", value: event.target.value });
                            }} />

                        <div style={{ top: `${i > 0 ? 123 : 75}px` }} className={styles.DropdownContent}>
                            {filterColors().map((x, index) => (<p key={'color' + index} onClick={() => onStockColorChange(i, x)}>{x}</p>))}
                        </div>

                        <input id={"stockCode" + i} placeholder="Штрих код *" value={itemData.stockData[i].code} onChange={(event) => onStockCodeChange(i, event.target.value)}></input>
                        <input id={"stockPrice" + i} placeholder="Ціна" type='number' value={itemData.stockData[i].price === 0 ? "" : itemData.stockData[i].price} onChange={(event) => onStockPriceChange(i, event.target.value)}></input>
                    </div>
                ))}

                <input type='button' className={styles.AddButton} value="Добавити варіант" onClick={() => onStockAdd(itemData.stockData.length)} />
                <div className={styles.CheckBoxes}>
                    <label htmlFor="addNovelty"><input id="addNovelty" type="checkbox" checked={itemData.novelty} className={styles.CheckBox} onChange={(event) => onNoveltyChange(event.target.checked)}></input>Новинка</label>
                    <label htmlFor="addHeat"><input id="addHeat" type="checkbox" checked={itemData.heat} className={styles.CheckBox} onChange={(event) => onHeatChange(event.target.checked)}></input>Хіт</label>
                </div>
            </div>
            <div className={styles.Images}>
                <div className={styles.Wrapper}>
                    {imagePairs.map((imagePair, index) => (
                        <div key={index} className={styles.ImageContainer}>
                            <AdminImageForm onSelect={imageRemoveHandler} url={imagePair.url} image={imagePair.image} />
                        </div>
                    ))}
                    <label htmlFor='imageSelect'><AiOutlinePlus />{selectedImages}</label>
                    <input
                        id='imageSelect'
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                            onImagesChange(e.target.files);
                            setSelectedImages(e.target.files.length)
                        }} />
                </div>
            </div>
        </form>
    )
}

export default AdminItemForm