import React from "react"
import SignUp from "./SignUp"
import Welcome from "./Welcome";
import { useSelector } from "react-redux"

function Auth() {
    const userState = useSelector(reducers => reducers._auth);

    return userState.success ? (<Welcome user = {userState}/>) : (<SignUp/>);
}

export default Auth
