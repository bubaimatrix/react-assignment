// List of all API Endpoints

//For Admin
export const API_ADMIN_LOGIN = "/admin/login";
export const API_ADMIN_LOGOUT = "/admin/logout";
export const API_ADMIN_LIST = "/admin/get-all";
export const API_ADMIN_CREATE = "/admin/add";
export const API_ADMIN_UPDATE = "/admin/update-admin-details";
export const API_ADMIN_DELETE = "/admin/delete-admin";
export const API_ADMIN_VIEW = "/admin/get";

//For Product
export const API_PRODUCT_LIST = "/product";
export const API_PRODUCT_ADD = "/product";
export const API_PRODUCT_VIEW = "/product";
export const API_PRODUCT_UPDATE = "/product";
export const API_PRODUCT_DELETE = "/product";

//For Coupon
export const API_COUPON_LIST = "/coupon";
export const API_COUPON_ADD = "/coupon";
export const API_COUPON_VIEW = "/coupon";
export const API_COUPON_UPDATE = "/coupon";
export const API_COUPON_DELETE = "/coupon";


// For Orders

export const API_ORDERS_LIST = "/checkout/order-list"; 
export const API_ORDERS_VIEW_LIST = "/checkout/order-view"; 



export const actualApiUrl = (apiUrl) => {
    return `${process.env.REACT_APP_API_BASE_URL}${apiUrl}`
}