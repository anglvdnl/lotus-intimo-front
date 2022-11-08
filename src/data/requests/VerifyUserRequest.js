const VerifyUserRequest = (name = "", email = "", password = "", facebookToken = "") => {
    return {
        name: name,
        email: email,
        password: password,
        facebookToken: facebookToken
    }
}

export { VerifyUserRequest };