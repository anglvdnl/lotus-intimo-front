import { createSlice } from '@reduxjs/toolkit';
import { DefaultUser } from "../../data/dto/User/UserDto"
import { loginReducer as login, logoutReducer as logout } from "../reducers/authReducers"

const authSlice = createSlice({
    name: "_auth",
    initialState: DefaultUser,
    reducers: {
        login,
        logout
    }
})

const authActions = authSlice.actions;

export { authSlice, authActions }