import React, {useState} from 'react'
import styles from './CustomInput.module.scss'
import {AiOutlineCheck, AiOutlineExclamation} from 'react-icons/ai'

function CustomInput({isRequired, name, type, reference, inputCallback, inputData, setInputData, value, isValid}) {
    function Validate(currentValue) {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // eslint-disable-next-line no-unused-expressions
        currentValue === "phoneNumber"
            ? inputData["phoneNumber"].includes("_") || !inputData["phoneNumber"].length
                ? inputData.isPhoneNumberValid = false
                : inputData.isPhoneNumberValid = true
            : null
        // eslint-disable-next-line no-unused-expressions
        currentValue === "name"
            ? isRequired && !inputData["name"].length
                ? inputData.isNameValid = false
                : inputData.isNameValid = true
            : null
        // eslint-disable-next-line no-unused-expressions
        currentValue === "email"
            ? (!inputData["email"].length)
                ? inputData.isEmailValid = null
                : !inputData["email"].match(regex)
                    ? inputData.isEmailValid = false
                    : inputData.isEmailValid = true
            : null
        setInputData({...inputData})
    }

    return (
        <div className={styles.InputWrapper}>
            <input
                className={isRequired ? styles.RequiredInput : undefined}
                type={type}
                placeholder="&nbsp;"
                name={name}
                required={isRequired}
                autoComplete="off"
                ref={type === "tel" ? reference : null}
                onChange={(e) => inputCallback(e.target.value)}
                onBlur={(e) => Validate(value)}
            />
            <label htmlFor={name}>{name}</label>
            {isRequired
                ? <span className={styles.Required}>*</span>
                : null
            }
            {isValid !== null
                ? isValid
                    ? <span className={styles.Valid}><AiOutlineCheck/></span>
                    : <span className={styles.Invalid}><AiOutlineExclamation/></span>
                : null
            }
        </div>
    )
}

export default CustomInput