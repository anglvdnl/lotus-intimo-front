import Config from '../configs/config.json'

const storageKeys = {
    user: "user",
    facebook: "fblo_" + Config.facebookAppId,
    cart: "cart"
};

export { storageKeys };