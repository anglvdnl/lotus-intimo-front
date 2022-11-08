import React, {useRef, useState} from 'react';
import styles from './Navbar.module.scss'
import icons from '../../data/utils/iconPaths';
import {NavLink, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {CgProfile} from 'react-icons/cg'
import {useOnClickOutside} from '../../data/hooks/useOnClickOutside'
import {authActions} from "../../core/slices/authSlice";

function Navbar() {
    const user = useSelector(reducers => reducers._auth);
    const [isBgActive, setIsBgActive] = useState(false)
    const [isProfileActive, setIsProfileActive] = useState(false)
    const dispatch = useDispatch();
    const ref = useRef();
    const btnRef = useRef();
    useOnClickOutside([ref, btnRef], () => setIsBgActive(false));

    const handleBgOpen = () => {
        isBgActive ? setIsBgActive(false) : setIsBgActive(true)
    }

    return (
        <React.Fragment>
            <div className={styles.Navbar}>
                <img alt='' src={icons.logo}/>
                <div
                    ref={btnRef}
                    className={!isBgActive
                        ? styles.btn11
                        : `${styles.btn11} ${styles.btn11Active}`}
                    onClick={handleBgOpen}
                    data-menu="11">
                    <div className={styles.iconLeft}></div>
                    <div className={styles.iconRight}></div>
                </div>
                <ul>
                    {/* <li><NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.inactiveLink} to="/">Головна</NavLink></li> */}
                    <li><NavLink className={({isActive}) => isActive ? styles.activeLink : styles.inactiveLink}
                                 to="/shop">Магазин</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? styles.activeLink : styles.inactiveLink}
                                 to="/cart">Кошик</NavLink></li>
                    {user.secret !== ''
                        ? <li><NavLink className={({isActive}) => isActive ? styles.activeLink : styles.inactiveLink}
                                       to={"/admin?secret=" + user.secret}>Адмін</NavLink></li>
                        : null}
                    {user.success
                        ? <li className={styles.Profile}>
                            <a onClick={() => setIsProfileActive(!isProfileActive)} href={"#"}
                               className={isProfileActive ? styles.activeProfile : styles.inactiveProfile}>
                                <CgProfile/>
                            </a>
                            {isProfileActive
                                ? <div className={styles.AccInfo}>
                                    {user.name}
                                    <button onClick={() => {
                                        dispatch(authActions.logout())
                                        setIsProfileActive(false)
                                    }}>Вийти</button>
                                </div>
                                : null
                            }
                        </li>
                        : <li>
                            <NavLink onClick={() => setIsBgActive(false)}
                                     className={({isActive}) => isActive ? styles.activeProfile : styles.inactiveProfile}
                                     to="/auth">
                                <CgProfile/>
                            </NavLink>
                        </li>
                    }
                </ul>
            </div>
            <div className={!isBgActive
                ? styles.BurgerMenu
                : `${styles.BurgerMenuActive}`
            }
                 ref={ref}>
                <ul>
                    {/* <li><NavLink onClick={() => setIsBgActive(false)} className={({ isActive }) => isActive ? styles.activeLink : null} to="/">Головна</NavLink></li> */}
                    <li><NavLink onClick={() => setIsBgActive(false)}
                                 className={({isActive}) => isActive ? styles.activeLink : null}
                                 to="/shop">Магазин</NavLink></li>
                    <li><NavLink onClick={() => setIsBgActive(false)}
                                 className={({isActive}) => isActive ? styles.activeLink : null}
                                 to="/cart">Кошик</NavLink></li>
                    {user.secret !== ''
                        ? <li><NavLink onClick={() => setIsBgActive(false)}
                                       className={({isActive}) => isActive ? styles.activeLink : null}
                                       to={"/admin?secret=" + user.secret}>Адмін</NavLink></li>
                        : null}
                    <li><NavLink onClick={() => setIsBgActive(false)}
                                 className={({isActive}) => isActive ? styles.activeProfile : null}
                                 to="/auth"><CgProfile/></NavLink></li>
                </ul>
            </div>
            <Outlet/>
        </React.Fragment>
    )
}

export default Navbar