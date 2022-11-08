import React from 'react';
import styles from "./Order.module.scss";
import Select from "react-select";
import {DeliveryTypes} from "../../data/enums/DeliveryTypes";
import AsyncSelect from "react-select/async";
import ShopList from "../../data/json/ShopList.json";
import {PaymentTypes} from "../../data/enums/PaymentTypes";
import axios from "axios";
import {serverApiPath} from "../../data/utils/serverApiPaths";

const areas = [];
const cities = [];
const departments = [];

function Selects({inputData, setInputData, handleInputData}) {
    const deliveryOptions = [
        {
            value: DeliveryTypes.SelfPickup,
            label: "Самовивіз"
        },
        {
            value: DeliveryTypes.NovaPoshta,
            label: "Нова Пошта"
        }
    ]

    const paymentOptions = [
        {
            value: PaymentTypes.Cash,
            label: "Накладений платіж"
        },
        // {
        //     value: PaymentTypes.Card,
        //     label: "Оплата карткою"
        // }
    ]
    const getAreas = (callback) => {
        axios.get(serverApiPath.getAreas)
            .then(response => {
                response.data.areas.map(x => areas.push({value: x.description, label: x.description, ref: x.ref}));
                callback(areas);
            })
            .catch(() => callback())
    }

    const getCities = (callback) => {
        axios.get(serverApiPath.getCities + inputData.areaRef)
            .then((response) => {
                response.data.cities.map(x => cities.push({value: x.description, label: x.description, ref: x.ref}))
                callback(cities)
            })
            .catch(() => callback())
    }

    const getDepartments = (callback) => {
        axios.get(serverApiPath.getDepartments + inputData.cityRef)
            .then(response => {
                console.log(response)
                response.data.departments.map(x => departments.push({value: x.description, label: x.description}))
                callback(departments)
            })
            .catch(() => callback())
    }

    const handleSelect = (valuePair) => {
        if (inputData.areaRef !== valuePair["areaRef"]) {
            cities.length = 0;
        }

        if (valuePair["deliveryType"] !== null) {
            if(valuePair["deliveryType"] === 0) {
                inputData.area = "";
                inputData.areaRef = "";
                inputData.city = "";
                inputData.cityRef = "";
                inputData.department = "";
            }
            else {
                inputData.shopAddress = "";
            }
        }

        for (const [key, value] of Object.entries(valuePair)) {
            inputData[key] = value
        }

        setInputData({...inputData})
    }

    const filterValues = (inputValue, array) => {
        const regex = /\([^)]*\)/;
        return array.filter((i) =>
            i.label.replace(regex, '').toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const areaPromise = (inputValue) => new Promise(resolve => areas.length > 0
        ? resolve(filterValues(inputValue, areas))
        : getAreas(resolve)
    );
    const cityPromise = (inputValue) => new Promise(resolve => cities.length > 0
        ? resolve(filterValues(inputValue, cities))
        : getCities(resolve)
    );
    const departmentPromise = (inputValue) => new Promise(resolve => departments.length > 0
        ? resolve(filterValues(inputValue, departments))
        : getDepartments(resolve)
    );

    return (
        <>
            <div className={styles.Delivery}>
                <h3>Доставка</h3>
                <div className={styles.Selects}>
                    <Select
                        classNamePrefix="select"
                        className="basic-single"
                        isClearable={false}
                        isSearchable={false}
                        options={deliveryOptions}
                        defaultValue={deliveryOptions[0]}
                        onChange={e => handleSelect({
                            "deliveryType": e.value
                        })}
                    />
                </div>
                <div className={styles.Selects}>
                    {inputData.deliveryType === DeliveryTypes.NovaPoshta
                        ? <>
                            <div className={styles.Select}>
                                <AsyncSelect
                                    placeholder="Область..."
                                    classNamePrefix="select"
                                    className="basic-single"
                                    isClearable={false}
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={areaPromise}
                                    onChange={e => handleSelect({
                                        "area": e.value,
                                        "areaRef": e.ref
                                    })}
                                />
                            </div>
                            {inputData.area !== ""
                                ? <div className={styles.Select}>
                                    <AsyncSelect
                                        key={inputData.areaRef}
                                        placeholder="Місто..."
                                        classNamePrefix="select"
                                        className="basic-single"
                                        isClearable={false}
                                        cacheOptions
                                        defaultOptions
                                        loadOptions={cityPromise}
                                        onChange={e => handleSelect({
                                            "city": e.value,
                                            "cityRef": e.ref
                                        })}
                                    />
                                </div>
                                : <div className={styles.Select}>
                                    <Select
                                        placeholder="Місто..."
                                        classNamePrefix="select"
                                        className="basic-single"
                                        isClearable={false}
                                    />
                                </div>}
                            {inputData.city !== ""
                                ? <div className={styles.Select}>
                                    <AsyncSelect
                                        key={inputData.cityRef}
                                        placeholder="Відділення..."
                                        classNamePrefix="select"
                                        className="basic-single"
                                        isClearable={false}
                                        cacheOptions
                                        defaultOptions
                                        loadOptions={departmentPromise}
                                        onChange={e => handleSelect({
                                            "department": e.value,
                                        })}
                                    />
                                </div>
                                : <div className={styles.Select}>
                                    <Select
                                        placeholder="Відділення..."
                                        classNamePrefix="select"
                                        className="basic-single"
                                        isClearable={false}
                                    />
                                </div>

                            }
                        </>
                        : inputData.deliveryType === DeliveryTypes.SelfPickup
                            ? <div className={styles.Select}>
                                <Select
                                    placeholder="Адреса..."
                                    classNamePrefix="select"
                                    className="basic-single"
                                    isClearable={false}
                                    isSearchable={false}
                                    options={ShopList.data}
                                    onChange={e => handleInputData("shopAddress", e.value)}
                                />
                            </div>
                            : null
                    }
                </div>
            </div>
            <div className={styles.Payment}>
                <h3>Оплата</h3>
                <div className={styles.Select}>
                    <Select
                        classNamePrefix="select"
                        className="basic-single"
                        isClearable={false}
                        isSearchable={false}
                        isDisabled={true}
                        options={paymentOptions}
                        defaultValue={paymentOptions[0]}
                        onChange={e => handleInputData("paymentType", e.value)}
                    />
                    <p>На даний момент існує тільки <br/> вказана можливість оплати</p>
                </div>
            </div>
        </>
    )
}

export default Selects;