import React, { useState } from "react"
import axios from "axios"
import FacebookLogin from "react-facebook-login"
import styles from "./Auth.module.scss"
import { authActions } from "../../core/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { UserDto } from "../../data/dto/User/UserDto"
import { serverApiPath } from "../../data/utils/serverApiPaths"
import { VerifyUserRequest } from "../../data/requests/VerifyUserRequest"
import { cartActions } from "../../core/slices/cartSlice"
import { useNavigate } from "react-router-dom";

function SignUp() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state._cart);
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const responseFacebook = response => {
        if (response.status !== "unknown") {
            axios.post(serverApiPath.postVerifyUser, VerifyUserRequest(response.name, response.email, "", response.userID))
                .then(handleVerify)
                .catch(error => console.error(error.message));
        }
    }

    const handleVerify = (response) => {
        if (!response.data.success) return;

        navigate("/shop")

        dispatch(authActions.login(UserDto(response.data.success, response.data.name,
            response.data.email, response.data.phone, response.data.password,
            response.data.facebookToken, response.data.secret, response.data.cart)));

        const userCart = response.data.cart;

        if (userCart.items.length > 0 && JSON.stringify(cart.items) !== JSON.stringify(userCart.items)) {
            dispatch(cartActions.combineCarts(userCart));
        }
    }

    return (
        <div className={styles.Auth}>
            {isLogin
                ?
                <div className={styles.Form}>
                    <h1>Увійти</h1>
                    <label htmlFor="email">E-пошта</label>
                    <input id="email" placeholder="Е-пошта" />
                    <label htmlFor="pass">Пароль</label>
                    <input id="pass" placeholder="Пароль" />

                    <button className={styles.SignUpBtn}>Увійти</button>
                </div>
                :
                <div className={styles.Form}>
                    <h1>Створити аккаунт</h1>
                    <label htmlFor="name">Повне ім'я</label>
                    <input id="name" placeholder="Повне Iм'я" />
                    <label htmlFor="phone">Номер телефону</label>
                    <input id="phone" placeholder="Номер телефону" />
                    <label htmlFor="email">E-пошта</label>
                    <input id="email" placeholder="Е-пошта" />
                    <label htmlFor="pass">Пароль</label>
                    <input id="pass" placeholder="Пароль" />
                    <div>
                        <input id="check" type="checkbox" />
                        <label htmlFor="check">
                            Підписатись на отимання всіх останніх новинок вам на пошту!
                        </label>
                    </div>
                    <button className={styles.SignUpBtn}>Створити</button>
                </div>
            }

            <div className={styles.Splitter}>
                <hr />
                <p>АБО</p>
                <hr />
            </div>

            <div className={styles.AdditionalButtons} >
                <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Створити аккаунт" : "Увійти"}</button>
                <FacebookLogin fields="name,email,picture" callback={responseFacebook} />
            </div>
        </div>
    )
}

export default SignUp
