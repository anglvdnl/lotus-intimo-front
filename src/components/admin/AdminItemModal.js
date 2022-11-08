import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions } from '../../core/slices/adminSlice';
import { serverApiPath } from '../../data/utils/serverApiPaths';
import styles from './AdminItemModal.module.scss';
import AdminItemForm from './AdminItemForm';
import LoadingScreenModal from '../loading/LoadingScreenModal';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';

let fileImages = [];
let imagesToDelete = [];
let isRequested = false;

function AdminItemModal() {
    const dispatch = useDispatch();
    const admin = useSelector(state => state._admin);
    const shop = useSelector(state => state._shop)
    const [isLoading, setLoading] = useState(false);
    const updateItemData = admin.updateItemData;
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    checkAdmin();

    function checkAdmin() {
        if (!admin.isAdmin) {
            isRequested = true;
            axios.get(serverApiPath.getAdminContent + searchParams.get("secret"))
                .then(r => {
                    isRequested = false;
                    dispatch(adminActions.setAdmin(r.data.success));
                })
                .catch(e => {
                    isRequested = false;
                });
        }
    }

    useEffect(() => {
        if (updateItemData.shopItem === null || updateItemData.shopItem.id != id) {
            dispatch(adminActions.setModalShopItem(shop.items.find(x => x.id == id)))
        }
    }, [])

    const updateItemClick = async () => {
        if (updateItemData.data.price <= 0) {
            alert("Ціна повинна бути більше нуля!");
            return;
        }

        if (updateItemData.data.name === "" || updateItemData.data.category < 0 || updateItemData.data.subCategory < 0) {
            alert("Заповніть всі обов'язкові* поля!");
            return;
        }

        for (let i = 0; i < updateItemData.data.stockData.length; i++) {
            const element = updateItemData.data.stockData[i];
            if (element.size === "" || element.code === "" || element.color === "") {
                alert("Заповніть поля варіантів вручну!");
                return;
            }
        }

        const uploadData = new FormData();

        uploadData.append("id", updateItemData.shopItem.id);
        uploadData.append("name", updateItemData.data.name);
        uploadData.append("brand", updateItemData.data.brand);
        uploadData.append("description", updateItemData.data.description);
        uploadData.append("category", updateItemData.data.category);
        uploadData.append("subCategory", updateItemData.data.subCategory);
        uploadData.append("price", updateItemData.data.price === "" ? 0 : updateItemData.data.price);
        uploadData.append("discount", updateItemData.data.discount === "" ? 0 : updateItemData.data.discount);
        uploadData.append("novelty", updateItemData.data.novelty);
        uploadData.append("heat", updateItemData.data.heat);
        uploadData.append("composition", updateItemData.data.composition)


        for (let i = 0; i < updateItemData.data.stockData.length; i++) {
            const element = updateItemData.data.stockData[i];
            console.log(JSON.stringify(element))
            uploadData.append("stockData", JSON.stringify(element));
        }

        setLoading(true);

        for (let i = 0; i < imagesToDelete.length; i++) {
            const response = await axios.delete(serverApiPath.removeImage + "?id=" + updateItemData.shopItem.id + "&imageKey=" + imagesToDelete[i]);
            console.log(response)
        }

        if (fileImages.length > 0) {
            const imageRequest = new FormData();

            imageRequest.append("id", updateItemData.shopItem.id);

            for (let i = 0; i < fileImages.length; i++) {
                imageRequest.append("images", fileImages[i]);
            }

            const response = await axios.post(serverApiPath.addImages, imageRequest,
                { headers: { "Content-Type": "multipart/form-data" } });

        }

        axios.post(serverApiPath.postUpdateShopItem, uploadData,
            { headers: { "Content-Type": "multipart/form-data" } })
            .then(response => {
                setLoading(false);

                alert(response.data.success
                    ? "Товар успішно відредаговано!"
                    : "Щось пішло не так.")

                if (response.data.success) {
                    window.location.reload(false);
                }
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }

    if (admin.isAdmin && updateItemData.shopItem !== null && updateItemData.shopItem.id == id) {
        return (
            <div className={styles.ItemModal}>
                {isLoading && <LoadingScreenModal />}
                <div className={styles.Container}>
                    <div className={styles.Form}>
                        <h2>Відредагувати товар</h2>
                        <AdminItemForm formKey="updateItem" itemData={updateItemData.data}
                            onNameChange={(value) => dispatch(adminActions.setUpdateItemValue({ key: "name", value: value }))}
                            onPriceChange={(value) => dispatch(adminActions.setUpdateItemValue({ key: "price", value: value }))}
                            onDescriptionChange={(value) => dispatch(adminActions.setUpdateItemValue({ key: "description", value: value }))}
                            onBrandChange={(value) => dispatch(adminActions.setUpdateItemValue({ key: "brand", value: value }))}
                            onCategoryChange={(value) => dispatch(adminActions.setUpdateItemValue({ key: "category", value: value }))}
                            onSubCategoryChange={(value) => dispatch(adminActions.setUpdateItemValue({ key: "subCategory", value: value }))}
                            onDiscountChange={(value) => dispatch(adminActions.setUpdateItemValue({ key: "discount", value: value }))}
                            onCompositionChange={(value) => dispatch(adminActions.setUpdateItemValue({ key: "composition", value: value }))}
                            onStockSizeChange={(index, value) => dispatch(adminActions.setUpdateStockDataSize({ index: index, value: value }))}
                            onStockColorChange={(index, value) => dispatch(adminActions.setUpdateStockDataColor({ index: index, value: value }))}
                            onStockCodeChange={(index, value) => dispatch(adminActions.setUpdateStockDataCode({ index: index, value: value }))}
                            onStockPriceChange={(index, value) => dispatch(adminActions.setUpdateStockDataPrice({ index: index, value: value }))}
                            onNoveltyChange={(value) => dispatch(adminActions.setUpdateItemValue({ key: "novelty", value: value }))}
                            onHeatChange={(value) => dispatch(adminActions.setUpdateItemValue({ key: "heat", value: value }))}
                            onImagesChange={(value) => fileImages = value}
                            onImageRemove={(value) => imagesToDelete = value}
                            onStockAdd={(dataIndex) => {
                                dispatch(adminActions.addUpdateStockData())
                                dispatch(adminActions.setUpdateStockDataPrice({ index: dataIndex, value: updateItemData.data.price }));
                            }}
                            onStockRemove={(dataIndex) => dispatch(adminActions.removeUpdateStockData(dataIndex))} />
                        <button className={styles.EditButton} onClick={updateItemClick}>Відредагувати</button>
                    </div>
                </div>
            </div>
        )
    } else if (isRequested) {
        return null
    } else {
        <Navigate to="/" replace />
    }
}

export default AdminItemModal