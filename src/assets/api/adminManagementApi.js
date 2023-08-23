import {
  API_ADMIN_CREATE,
  API_ADMIN_DELETE,
  API_ADMIN_LIST,
  API_ADMIN_LOGIN,
  API_ADMIN_LOGOUT,
  API_ADMIN_UPDATE,
  API_ADMIN_VIEW,
  actualApiUrl,
} from "./commonApiEndPoint";
import { COMMON_HEADERS } from "./commonApiHeader";

// Login
export const ADMIN_LOGIN = async (payload) => {
  try {
    const adminLoginDetails = await fetch(actualApiUrl(API_ADMIN_LOGIN), {
      method: "POST",
      headers: COMMON_HEADERS,
      body: JSON.stringify(payload),
    });
    const returnData = await adminLoginDetails.json();
    console.log("returnData->>> ", returnData);

    return returnData;
  } catch (error) {
    return error;
  }
};

// Logout
export const ADMIN_LOGOUT = async (token) => {
  try {
    const headers = { ...COMMON_HEADERS, Authorization: `Bearer ${token}` };
    const adminLogoutDetails = await fetch(actualApiUrl(API_ADMIN_LOGOUT), {
      method: "PUT",
      headers: headers,
    });
    const returnData = await adminLogoutDetails.json();

    return returnData;
  } catch (error) {
    return error;
  }
};

// GET API Admin List

// get api
export const GET_ADMIN_LIST = async (token, { page, limit }) => {
  try {
    const headers = { ...COMMON_HEADERS, Authorization: `Bearer ${token}` };
    const getAdminDetails = await fetch(
      `${actualApiUrl(API_ADMIN_LIST)}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const returnData = await getAdminDetails.json();
    return returnData;
  } catch (error) {
    return error;
  }
};

// view api
export const VIEW_ADMIN_API = async (token, productId) => {
  try {
    const headers = { ...COMMON_HEADERS, Authorization: `Bearer ${token}` };
    const getAdminViews = await fetch(
      `${actualApiUrl(API_ADMIN_VIEW)}/${productId}`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const returnData = await getAdminViews.json();
    return returnData;
  } catch (error) {
    return error;
  }
};

// create api
export const CREATE_ADMIN_API = async (token, payload) => {
  try {
    delete COMMON_HEADERS["Content-Type"];
    const headers = { ...COMMON_HEADERS, Authorization: `Bearer ${token}` };
    const addAdmin = await fetch(actualApiUrl(API_ADMIN_CREATE), {
      method: "POST",
      headers: headers,
      body: payload,
    });
    const returnData = await addAdmin.json();
    return returnData;
  } catch (error) {
    console.log("Error->> ", error);
    return error;
  }
};

// update api
export const UPDATE_ADMIN_API = async (token, adminId, payload) => {
  try {
    delete COMMON_HEADERS["Content-Type"];
    // console.log("COMMON_HEADERS--->> ", COMMON_HEADERS);
    const headers = { ...COMMON_HEADERS, Authorization: `Bearer ${token}` };
    const updateAdmin = await fetch(
      `${actualApiUrl(API_ADMIN_UPDATE)}/${adminId}`,
      {
        method: "PUT",
        headers: headers,
        body: payload,
      }
    );
    const returnData = await updateAdmin.json();

    return returnData;
  } catch (error) {
    console.log("Error->> ", error);
    return error;
  }
};
// delete api
export const DELETE_ADMIN_API = async (token, adminId) => {
  try {
    const headers = { ...COMMON_HEADERS, Authorization: `Bearer ${token}` };
    const deleteAdmin = await fetch(
      `${actualApiUrl(API_ADMIN_DELETE)}/${adminId}`,
      {
        method: "DELETE",
        headers: headers,
      }
    );
    const returnData = await deleteAdmin.json();
    return returnData;
  } catch (error) {
    return error;
  }
};
