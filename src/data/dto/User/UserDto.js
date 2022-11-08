import { DefaultCartDto } from "../Cart/CartDto";

const UserDto = (success, name, email, phone = '', password = '', facebookToken = '', secret = '', cart = DefaultCartDto) => {
    return {
        success: success, 
        name: name, 
        email: email,
        phone: phone,
        password: password,
        facebookToken: facebookToken,
        secret: secret,
        cart: cart
    }
};

const DefaultUser = UserDto(false, '', '', '', '', '', '', DefaultCartDto);

export { UserDto, DefaultUser };
