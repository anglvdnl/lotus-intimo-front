import React, {useEffect, useState} from 'react';
import CustomInput from '../customInput/CustomInput';
import styles from './Order.module.scss';
import {useMask} from 'react-mask-field';
import {useSelector} from 'react-redux';
import OrderItem from './OrderItem';
import axios from 'axios';
import {serverApiPath} from '../../data/utils/serverApiPaths';
import {DeliveryTypes} from '../../data/enums/DeliveryTypes';
import {PaymentTypes} from '../../data/enums/PaymentTypes'
import Selects from "./Delivery";

function Order() {
    const [inputData, setInputData] = useState({
        name: "",
        isNameValid: null,
        surname: "",
        phoneNumber: "",
        isPhoneNumberValid: null,
        email: "",
        isEmailValid: null,
        deliveryType: DeliveryTypes.SelfPickup,
        paymentType: PaymentTypes.Cash,
        area: "",
        city: "",
        department: "",
        shopAddress: "",
        areaRef: "",
        cityRef: "",
        isFormValid: false
    })

    const [isFormValid, setIsFormValid] = useState(null)

    const ref = useMask({
        mask: '+38(___)___-__-__', replacement: {_: /\d/}, showMask: true
    });

    const shop = useSelector(state => state._shop);
    const cart = useSelector(state => state._cart);
    const cartItems = cart.items;
    const shopItems = [];
    const body = [];
    const items = [];

    for (let i = 0; i < cartItems.length; i++) {
        const shopItem = shop.items.find(x => x.id === cartItems[i].id);
        const currentStockData = shopItem.stockData.find(x => x.code === cartItems[i].code);

        if (shopItem) {
            body.push(<OrderItem key={i} item={shopItem} code={cartItems[i].code} count={cartItems[i].count}/>);
            shopItems.push({item: shopItem, count: cartItems[i].count, currentStockData: currentStockData});
            items.push({
                code: cartItems[i].code,
                name: shopItem.name,
                count: cartItems[i].count,
                discount: shopItem.discount,
                price: currentStockData.price,
                size: currentStockData.size,
                color: currentStockData.color
            })
        }
    }
    const totalPrice = shopItems.reduce((total, element) => total + (element.currentStockData.price - (element.currentStockData.price * element.item.discount) / 100) * element.count, 0);

    function handleOrder() {
        inputData.isFormValid = inputData.isNameValid && inputData.isPhoneNumberValid && (inputData.isEmailValid === null || inputData.isEmailValid)
            && ((inputData.area.length && inputData.city.length && inputData.department.length) || inputData.shopAddress.length)

        if (inputData.isFormValid) {
            setIsFormValid(true)
            const uploadData = new FormData();

            uploadData.append("name", inputData.name);
            uploadData.append("surname", inputData.surname);
            uploadData.append("phonenumber", inputData.phoneNumber);
            uploadData.append("email", inputData.email);
            uploadData.append("deliveryType", inputData.deliveryType);
            uploadData.append("paymentType", inputData.paymentType);
            uploadData.append("area", inputData.area);
            uploadData.append("city", inputData.city);
            uploadData.append("department", inputData.department);
            uploadData.append("shopAddress", inputData.shopAddress);

            for (let i = 0; i < items.length; i++) {
                const element = items[i];
                uploadData.append("items", JSON.stringify(element));
            }

            axios.post(serverApiPath.makeOrder, uploadData,
                {headers: {"Content-Type": "multipart/form-data"}})
                .then(response => {
                    console.log(response);
                })
                .catch(error => console.log(error));
        } else {
            setIsFormValid(false)
        }
    }

    const handleInputData = (id, value) => {
        inputData[id] = value;
    }

    return (
        <div className={styles.Wrapper}>
            <div className={styles.Info}>
                <div className={styles.Contacts}>
                    <h3>Контактні дані</h3>
                    <div>
                        <CustomInput isValid={inputData.isNameValid} inputData={inputData}
                                     setInputData={setInputData} value="name" isRequired={true}
                                     inputCallback={(value) => handleInputData("name", value)}
                                     name="Ім'я" type="text"/>
                        <CustomInput isValid={null} inputData={inputData} value="surname"
                                     setInputData={setInputData}
                                     inputCallback={(value) => handleInputData("surname", value)}
                                     name="Прізвище" type="text"/>
                    </div>
                    <div>
                        <CustomInput isValid={inputData.isPhoneNumberValid} inputData={inputData}
                                     setInputData={setInputData} value="phoneNumber" isRequired={true}
                                     inputCallback={(value) => handleInputData("phoneNumber", value)}
                                     name="Номер телефону" type="tel" reference={ref}/>
                        <CustomInput isValid={inputData.isEmailValid} inputData={inputData}
                                     setInputData={setInputData} value="email" isRequired={false}
                                     inputCallback={(value) => handleInputData("email", value)}
                                     name="E-mail" type="email"/>
                    </div>
                </div>
                <Selects inputData={inputData} setInputData={setInputData} handleInputData={handleInputData}/>
                <button onClick={handleOrder}>Оформити</button>
                {isFormValid === null
                    ? null
                    : !isFormValid
                        ? <p className={styles.Valid}>Заповніть будь ласка всі поля</p>
                        : null
                }
            </div>
            <div className={styles.CartItems}>
                {body}
                <h3>Всього: {totalPrice} ₴</h3>
            </div>
        </div>
    )
}

export default Order