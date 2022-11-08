import axios from "axios";
import { blobToImage } from "./myUtils";
import { serverApiPath } from "./serverApiPaths";
import imageError from '../../static/Images/imageError.png'

const imagePool = [];
const requestQueue = [];

const getItemImage = (imageUrl, imageCallback) => {

    if (containsImage(imageUrl)) {
        imageCallback(getImage(imageUrl));
        return;
    }

    createItemImage(imageUrl, imageCallback);
}

const createItemImage = (imageUrl, imageCallback) => {

    if (requestQueue.includes(imageUrl)) return;

    requestQueue.push(imageUrl);

    if (!imagePool.some(x => x.key === imageUrl)) {
        imagePool.push({ key: imageUrl, image: null });
    }

    axios.get(serverApiPath.getImage + imageUrl, {
        responseType: "blob"
    })
        .then((response) => {
            blobToImage(response.data, image => {
                imagePool.find(x => x.key === imageUrl).image = image;
                handleResponse(imageUrl);
                imageCallback(image);
            })
        })
        .catch(e => {
            handleResponse(imageUrl)
            imageCallback(imageError)
        });

    const handleResponse = (url) => {
        for (let i = 0; i < requestQueue.length; i++) {
            if (requestQueue[i] === url) {
                requestQueue.splice(i, 1);
                break;
            }
        }
    }
}

const getImage = (imageUrl) => imagePool.find(x => x.key === imageUrl).image;
const containsImage = (imageUrl) => imagePool.some(x => x.key === imageUrl && x.image !== null);
export { getItemImage }