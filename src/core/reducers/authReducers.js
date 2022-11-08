import { DefaultUser } from "../../data/dto/User/UserDto"
import { storageKeys } from "../../data/utils/storageKeys"

const loginReducer = (state, action) => {
    let userResponse = action.payload;

    if (userResponse.success) {
        state.success = userResponse.success;
        state.name = userResponse.name;
        state.email = userResponse.email;
        state.phone = userResponse.phone;
        state.secret = userResponse.secret;

        localStorage.setItem(storageKeys.user, JSON.stringify(userResponse));
    }
}

const logoutReducer = (state) => {
    const noUserInfo = DefaultUser;

    state.success = noUserInfo.success;
    state.name = noUserInfo.name;
    state.email = noUserInfo.email;
    state.avatarUrl = noUserInfo.avatarUrl;
    state.secret = noUserInfo.secret;

    window.FB.getLoginStatus(response => {
        if (response.status === "connected") {
            window.FB.logout();
        }
    });

    localStorage.removeItem(storageKeys.user);
    localStorage.removeItem(storageKeys.facebook);

    console.log(noUserInfo);
}

export { loginReducer, logoutReducer }
