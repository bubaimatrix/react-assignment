import { API_COUPON_LIST, API_COUPON_ADD, actualApiUrl, API_COUPON_VIEW, API_COUPON_DELETE, API_COUPON_UPDATE } from "./commonApiEndPoint";
import { COMMON_HEADERS } from "./commonApiHeader";

// get api
export const GET_COUPON_API = async (token, { page, limit }) => {
    try{
        const headers = { ...COMMON_HEADERS, 'Authorization': `Bearer ${token}` };
        const getProductDetails = await fetch(`${actualApiUrl(API_COUPON_LIST)}?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: headers
        });
        const returnData = await getProductDetails.json();
        // console.log("returnData->>> ", returnData);

        return returnData;
    } catch(error) {
        return error;
    }
}
// create api
export const CREATE_COUPON_API = async (token, payload) => {
    try{
        delete COMMON_HEADERS["Content-Type"];
        console.log("COMMON_HEADERS--->> ", COMMON_HEADERS);
        const headers = { ...COMMON_HEADERS, 'Authorization': `Bearer ${token}` };
        const addProduct = await fetch(actualApiUrl(API_COUPON_ADD), {
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
export const VIEW_COUPON_API = async (token, couponId) => {
    try{
        const headers = { ...COMMON_HEADERS, 'Authorization': `Bearer ${token}` };
        const getProductDetails = await fetch(`${actualApiUrl(API_COUPON_VIEW)}/${couponId}`, {
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
export const UPDATE_COUPON_API = async (token, couponId, payload) => {
    try{
        delete COMMON_HEADERS["Content-Type"];
        // console.log("COMMON_HEADERS--->> ", COMMON_HEADERS);
        const headers = { ...COMMON_HEADERS, 'Authorization': `Bearer ${token}` };
        const updateProduct = await fetch(`${actualApiUrl(API_COUPON_UPDATE)}/${couponId}`, {
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
export const DELETE_COUPON_API = async (token, productId) => {
    try{
        // console.log("COMMON_HEADERS--->> ", COMMON_HEADERS);
        const headers = { ...COMMON_HEADERS, 'Authorization': `Bearer ${token}` };
        const updateProduct = await fetch(`${actualApiUrl(API_COUPON_DELETE)}/${productId}`, {
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