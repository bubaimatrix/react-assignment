import { API_ORDERS_LIST, API_ORDERS_VIEW_LIST,actualApiUrl } from "./commonApiEndPoint";
import { COMMON_HEADERS } from "./commonApiHeader";


// get api
export const GET_ORDERS_API_LIST = async (token, { page, limit }) => {
    try{
        const headers = { ...COMMON_HEADERS, 'Authorization': `Bearer ${token}` };
        const getOrdersList = await fetch(`${actualApiUrl(API_ORDERS_LIST)}?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: headers
        });
        const returnData = await getOrdersList.json();

        return returnData;
    } catch(error) {
        return error;
    }
}

// view api
export const VIEW_ORDERS_VIEW_API = async (token, OrdersId) => {
    try{
        const headers = { ...COMMON_HEADERS, 'Authorization': `Bearer ${token}` };
        const getOrdersListView = await fetch(`${actualApiUrl(API_ORDERS_VIEW_LIST)}/${OrdersId}`, {
            method: "GET",
            headers: headers
        });
        const returnData = await getOrdersListView.json();

        return returnData;
    } catch(error) {
        return error;
    }
}
