import React, { useState } from 'react'
import styles from './Admin.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverApiPath } from '../../data/utils/serverApiPaths';
import { adminActions } from '../../core/slices/adminSlice';
import { shopActions } from '../../core/slices/shopSlice';
import AdminItem from './AdminItem';
import AdminItemModal from './AdminItemModal';
import AdminItemForm from './AdminItemForm';
import LoadingScreenModal from '../loading/LoadingScreenModal';
import PaginationView from '../pagination/Pagination';

let fileImages = [];

function Admin() {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(20)
    const shop = useSelector(state => state._shop);
    const admin = useSelector(state => state._admin);

    const addItemState = admin.addItemData;
    const filteredItems = shop.items.filter(value => value.name.toLowerCase().includes(admin.searchValue.toLowerCase()));

    const handleSearchChange = (event) => { dispatch(adminActions.setSearchValue(event.target.value)) }

    const handleAddItemClick = () => {
        if (addItemState.price <= 0) {
            alert("Ціна повинна бути більше нуля!");
            return;
        }

        if (addItemState.name === "" || addItemState.category < 0 || addItemState.subCategory < 0) {
            alert("Заповніть всі обов'язкові(*) поля!");
            return;
        }

        for (let i = 0; i < addItemState.stockData.length; i++) {
            const element = addItemState.stockData[i];
            if (element.size === "" || element.code === "" || element.color === "") {
                alert("Заповніть поля варіантів вручну!");
                return;
            }
        }

        if (fileImages.length === 0) {
            alert("Добавте зображення для товару!");
            return;
        }

        const uploadData = new FormData();

        uploadData.append("name", addItemState.name);
        uploadData.append("brand", addItemState.brand);
        uploadData.append("description", addItemState.description);
        uploadData.append("category", addItemState.category);
        uploadData.append("subCategory", addItemState.subCategory);
        uploadData.append("price", addItemState.price === "" ? 0 : addItemState.price);
        uploadData.append("discount", addItemState.discount === "" ? 0 : addItemState.discount);
        uploadData.append("novelty", addItemState.novelty);
        uploadData.append("heat", addItemState.heat);

        for (let i = 0; i < addItemState.stockData.length; i++) {
            const element = addItemState.stockData[i];
            console.log(JSON.stringify(element))
            uploadData.append("stockData", JSON.stringify(element));
        }

        for (let i = 0; i < fileImages.length; i++) {
            uploadData.append("images", fileImages[i]);
        }

        uploadData.append("composition", addItemState.composition);

        setLoading(true);

        axios.post(serverApiPath.postAddShopItem, uploadData,
            { headers: { "Content-Type": "multipart/form-data" } })
            .then(response => {
                setLoading(false);

                alert(response.data.success
                    ? "Товар успішно додано!"
                    : "Товар не вдалось додати. Перевірте введені поля.")

                if (response.data.success) {
                    resetForm();
                    window.location.reload(false);
                }
            })
            .catch(error => console.log(error));
    }

    const resetForm = () => {
        for (let i = 1; i < addItemState.stockData.length; i++) {
            const elem = document.getElementById("stockDataDiv" + i);
            if (elem) {
                elem.remove();
            }
        }

        dispatch(adminActions.resetAddItem());
        fileImages = [];
        document.getElementById("addItemForm").reset();
    }

    const setPrice = (value) => {
        dispatch(adminActions.setAddItemValue({ key: "price", value: value }));

        for (let i = 0; i < addItemState.stockData.length; i++) {
            dispatch(adminActions.setItemStockDataPrice({ index: i, value: value }));

            const stockPriceInput = document.getElementById("stockPrice" + i);
            stockPriceInput.value = value;
        }
    }

    let adminBody = []

    adminBody = filteredItems.map((shopItem, index) => (
        <AdminItem key={index}
            shopItem={shopItem}
            onDelete={() => dispatch(shopActions.deleteItem(shopItem.id))} />
    ))

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = adminBody.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <div className={styles.Admin}>
                {isLoading && <LoadingScreenModal />}
                <input className={styles.Search} placeholder="ПОШУК" onChange={handleSearchChange} />
                <div className={styles.Items}>
                    {currentItems}
                </div>
                <PaginationView totalItems={adminBody.length} itemsPerPage={itemsPerPage} pagination={pagination} />
                <div className={styles.Form}>
                    <h2>Добавити новий товар</h2>
                    <AdminItemForm formKey="addItem" itemData={addItemState}
                        onNameChange={(value) => dispatch(adminActions.setAddItemValue({ key: "name", value: value }))}
                        onPriceChange={(value) => setPrice(value)}
                        onDescriptionChange={(value) => dispatch(adminActions.setAddItemValue({ key: "description", value: value }))}
                        onBrandChange={(value) => dispatch(adminActions.setAddItemValue({ key: "brand", value: value }))}
                        onCategoryChange={(value) => dispatch(adminActions.setAddItemValue({ key: "category", value: value }))}
                        onSubCategoryChange={(value) => dispatch(adminActions.setAddItemValue({ key: "subCategory", value: value }))}
                        onDiscountChange={(value) => dispatch(adminActions.setAddItemValue({ key: "discount", value: value }))}
                        onCompositionChange={(value) => dispatch(adminActions.setAddItemValue({ key: "composition", value: value }))}
                        onStockSizeChange={(index, value) => dispatch(adminActions.setItemStockDataSize({ index: index, value: value }))}
                        onStockColorChange={(index, value) => dispatch(adminActions.setItemStockDataColor({ index: index, value: value }))}
                        onStockCodeChange={(index, value) => dispatch(adminActions.setItemStockDataCode({ index: index, value: value }))}
                        onStockPriceChange={(index, value) => dispatch(adminActions.setItemStockDataPrice({ index: index, value: value }))}
                        onNoveltyChange={(value) => dispatch(adminActions.setAddItemValue({ key: "novelty", value: value }))}
                        onHeatChange={(value) => dispatch(adminActions.setAddItemValue({ key: "heat", value: value }))}
                        onImagesChange={(value) => fileImages = value}
                        onStockAdd={(dataIndex) => {
                            dispatch(adminActions.addItemStockData())
                            dispatch(adminActions.setItemStockDataPrice({ index: dataIndex, value: addItemState.price }));
                        }}
                        onStockRemove={(dataIndex) => dispatch(adminActions.removeItemStockData(dataIndex))} />

                    <button className={styles.AddButton} onClick={handleAddItemClick}>Добавити</button>
                </div>
            </div>
        </div>
    )
}

export default Admin