import { API_PRODUCT_LIST, API_PRODUCT_ADD, actualApiUrl, API_PRODUCT_VIEW, API_PRODUCT_DELETE, API_PRODUCT_UPDATE } from "./commonApiEndPoint";
import { COMMON_HEADERS } from "./commonApiHeader";

// get api
export const GET_PRODUCT_API = async ({ page, limit }) => {
    try{
        const getProductDetails = await fetch(`${actualApiUrl(API_PRODUCT_LIST)}?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: COMMON_HEADERS
        });
        const returnData = await getProductDetails.json();
        // console.log("returnData->>> ", returnData);

        return returnData;
    } catch(error) {
        return error;
    }
}
// create api
export const CREATE_PRODUCT_API = async (token, payload) => {
    try{
        delete COMMON_HEADERS["Content-Type"];
        console.log("COMMON_HEADERS--->> ", COMMON_HEADERS);
        const headers = { ...COMMON_HEADERS, 'Authorization': `Bearer ${token}` };
        const addProduct = await fetch(actualApiUrl(API_PRODUCT_ADD), {
            method: "POST",
            headers: headers,
            body: payload
        });
        const returnData = await addProduct.json();
        // console.log("returnData->>> ", returnData);

        return returnData;
    } catch(error) {
        console.log("Error->> ", error);
        return error;
    }
}
// view api
export const VIEW_PRODUCT_API = async (token, productId) => {
    try{
        const headers = { ...COMMON_HEADERS, 'Authorization': `Bearer ${token}` };
        const getProductDetails = await fetch(`${actualApiUrl(API_PRODUCT_VIEW)}/${productId}`, {
            method: "GET",
            headers: headers
        });
        const returnData = await getProductDetails.json();

        return returnData;
    } catch(error) {
        return error;
    }
}
// update api
export const UPDATE_PRODUCT_API = async (token, productId, payload) => {
    try{
        delete COMMON_HEADERS["Content-Type"];
        // console.log("COMMON_HEADERS--->> ", COMMON_HEADERS);
        const headers = { ...COMMON_HEADERS, 'Authorization': `Bearer ${token}` };
        const updateProduct = await fetch(`${actualApiUrl(API_PRODUCT_UPDATE)}/${productId}`, {
            method: "PUT",
            headers: headers,
            body: payload
        });
        const returnData = await updateProduct.json();
        // console.log("returnData->>> ", returnData);

        return returnData;
    } catch(error) {
        console.log("Error->> ", error);
        return error;
    }
}
// delete api
export const DELETE_PRODUCT_API = async (token, productId) => {
    try{
        // console.log("COMMON_HEADERS--->> ", COMMON_HEADERS);
        const headers = { ...COMMON_HEADERS, 'Authorization': `Bearer ${token}` };
        const updateProduct = await fetch(`${actualApiUrl(API_PRODUCT_DELETE)}/${productId}`, {
            method: "DELETE",
            headers: headers,
        });
        const returnData = await updateProduct.json();
        // console.log("returnData->>> ", returnData);

        return returnData;
    } catch(error) {
        console.log("Error->> ", error);
        return error;
    }
}