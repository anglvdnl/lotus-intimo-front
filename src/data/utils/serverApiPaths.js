import Config from '../configs/config.json';

const serverApiPath = {
    //SHOP
    getShopItems: Config.serverApiPath + "/Shop/GetItems",
    getImage: Config.serverApiPath + "/Shop/GetImage?imageKey=",
    postUpdateImages: Config.serverApiPath + "/Shop/UpdateImages",
    postAddShopItem: Config.serverApiPath + "/Shop/AddItem",
    postUpdateShopItem: Config.serverApiPath + "/Shop/UpdateItem",
    deleteShopItem: Config.serverApiPath + "/Shop/DeleteItem?id=",
    addImages: Config.serverApiPath + "/Shop/AddImages",
    removeImage: Config.serverApiPath + "/Shop/RemoveImage",

    //USER
    getAdminContent: Config.serverApiPath + "/User/GetAdminContent?secret=",
    getUserCart: Config.serverApiPath + "/User/GetCart?email=",
    postVerifyUser: Config.serverApiPath + "/User/Verify",
    postRegisterUser: Config.serverApiPath + "/User/Register",
    postSetUserCart: Config.serverApiPath + "/User/SetCart",
    deleteUser: Config.serverApiPath + "/User/Delete?id=",

    //SERVICE   
    makeOrder: Config.serverApiPath + "/Service/MakeOrder",
    getLogs: Config.serverApiPath + "/Service/GetLogs",

    //NOVA POSHTA
    getAreas: Config.serverApiPath + "/NovaPoshta/GetAreas",
    getCities: Config.serverApiPath + "/NovaPoshta/GetCities?areaRef=",
    getDepartments: Config.serverApiPath + "/NovaPoshta/GetDepartments?cityRef="
};

export { serverApiPath };