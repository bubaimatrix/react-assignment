// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import Cover from "layouts/authentication/forgot-password/cover";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { PersonAdd } from "@mui/icons-material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import OrdersManagements from "layouts/order-management";
import ProductManagements from "layouts/product-managements";
import ManageSalesReport from "layouts/manage-sales-report";
//toast message
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CreateProduct from "layouts/dashboard/components/CreateProduct";
import UpdateProduct from "layouts/dashboard/components/UpdateProduct";
import CreateUser from "layouts/dashboard/components/CreateUser";
import Refferal from "layouts/dashboard/components/Refferal";
import Coupon from "layouts/dashboard/components/Coupon";
import UpdateCoupon from "layouts/dashboard/components/UpdateCopoun";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CreateCopoun from "layouts/dashboard/components/CreateCopoun";
import ChangePassword from "layouts/authentication/changePassword";
import UpdateAdmin from "layouts/dashboard/components/UpdateAdmin";
import CreateAdmin from "layouts/dashboard/components/CreateAdmin";
import ManageAdminAccounts from "layouts/manage-admin-accounts";
// import ManageUserAccounts from "layouts/manage-user-accounts";
// function setToken(userToken) {
//   localStorage.setItem("token", JSON.stringify(userToken));
// }

function getToken() {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

const token = getToken();
console.log(token);
// console.log(token);
// if (!token) {
//   return <SignIn />;
// }

async function logoutAdmin(credentials) {
  return fetch("http://localhost:4000/api/v1/admin/logout", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      admin: true,
      "Accept-Language": "EN",
      Authorization: `Bearer ${credentials.res}`,
    },
    body: "",
  }).then((data) => {
    if (data?.status === 200) {
      data.json();
      toast.success("You Have SuceessFully Logged out!");
      localStorage.removeItem("token");
      window.location.reload();
    }
  });
}

const logoutClick = () => {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const res = userToken?.token;
  const token = logoutAdmin({
    res,
  });
};

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Order Management",
    key: "Order-Management",
    icon: <LocalMallIcon fontSize="small" />,
    route: "/Order-Management",
    component: <OrdersManagements />,
  },
  // {
  //   type: "collapse",
  //   name: "User Management",
  //   key: "User-Management",
  //   icon: <LocalMallIcon fontSize="small" />,
  //   route: "/Manage-User-Management",
  //   component: <ManageUserAccounts />,
  // },
  // {
  //   type: "collapse",
  //   name: "Manage CMS Pages",
  //   key: "Manage-CMS-Pages-and-information",
  //   icon: <AutoStoriesIcon fontSize="small" />,
  //   route: "/Manage CMS Pages and information",
  //   component: <Dashboard />,
  // },
  {
    type: "collapse",
    name: "Manage admin accounts",
    key: "Manage-admin-accounts",
    icon: <ManageAccountsIcon fontSize="small" />,
    route: "/Manage-admin-accounts",
    component: <ManageAdminAccounts />,
  },
  // {
  //   type: "collapse",
  //   name: "Manage user accounts",
  //   key: "Manage-user-accounts",
  //   icon: <ManageAccountsIcon fontSize="small" />,
  //   route: "/Manage-user-accounts",
  //   component: <ManageUserAccounts />,
  // },
  {
    type: "collapse",
    name: "Manage sales report",
    key: "Manage-sales-report",
    icon: <AssessmentIcon fontSize="small" />,
    // icon: (
    //   <Icon fontSize="small" className="icons">
    //     dashboard
    //   </Icon>
    // ),
    route: "/Manage-sales-report",
    component: <ManageSalesReport />,
  },
  {
    type: "collapse",
    name: "Product management",
    key: "product-management",
    icon: <ProductionQuantityLimitsIcon fontSize="small" />,
    // icon: (
    //   <Icon fontSize="small" className="icons">
    //     ProductionQuantityLimitsIcon
    //   </Icon>
    // ),
    route: "/product-management",
    component: <ProductManagements />,
  },
  // {
  //   type: "collapse",
  //   name: "User Management",
  //   key: "user-management",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/user-management",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  {
    type: "collapse",
    name: "Manage Payments",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    // icon: (
    //   <Icon fontSize="small" className="icons">
    //     PaymentsIcon
    //   </Icon>
    // ),
    route: "/billing",
    component: <Billing />,
  },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small" >notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   // icon: <Icon fontSize="small" >person</Icon>,
  //   icon: <Icon fontSize="small" className="icons">person</Icon>,

  //   route: "/profile",
  //   component: <Profile />,
  // },
  {
    type: "collapse",
    name: "Coupon",
    key: "Coupon",
    // icon: (
    //   <Icon fontSize="small" className="icons">
    //     dashboard
    //   </Icon>
    // ),
    icon: <AttachMoneyIcon fontSize="small" />,
    route: "/coupon",
    component: <Coupon />,
  },
  {
    route: "/coupon/edit/:id",
    component: <UpdateCoupon />,
  },
  {
    type: "collapse",
    // name: token ? "Sign Out" : "Sign In",
    key: "sign-in",
    // icon: <Icon fontSize="small">login</Icon>,
    route: token ? "" : "/authentication/sign-in",
    component: <SignIn />,
    onClick: logoutClick,
  },
  {
    route: "/create-product",
    component: <CreateProduct />,
  },
  {
    route: "/product/edit/:id",
    component: <UpdateProduct />,
  },
  {
    route: "/create-admin",
    component: <CreateAdmin />,
  },
  {
    route: "/admin/edit/:id",
    component: <UpdateAdmin />,
  },
  {
    route: "/create-user",
    component: <CreateUser />,
  },
  {
    route: "/change-Password",
    component: <ChangePassword />,
  },
  {
    route: "/create-coupon",
    component: <CreateCopoun />,
  },

  // {
  //   type: "collapse",
  //   // name: "Forget Password",
  //   key: "forget-password",
  //   // icon: <Icon fontSize="small" color="primary">assignment</Icon>,
  //   route: "/authentication/Forget-password",
  //   component: <Cover />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
